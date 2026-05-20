import uuid
import asyncio
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from app.schemas.schemas import SubmissionCreate, ScoreSubmission
from app.core.database import get_supabase
from app.core.auth import get_current_user
from app.core.socket_manager import emit_room_update, emit_score_update
from app.workers.job_worker import run_generation_job

router = APIRouter(prefix="/submissions", tags=["submissions"])


@router.post("")
async def create_submission(
    data: SubmissionCreate,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user),
):
    db = get_supabase()

    # Validate round exists and is active
    round_ = db.table("rounds").select("*, rooms(*)").eq("id", data.round_id).execute().data
    if not round_:
        raise HTTPException(status_code=404, detail="Round not found")
    round_ = round_[0]

    if round_["status"] != "active":
        raise HTTPException(status_code=400, detail="Round is not active")

    # Host cannot submit as contestant
    room = round_["rooms"]
    if room["host_id"] == current_user["id"]:
        raise HTTPException(status_code=403, detail="Host cannot submit as a contestant")

    # Validate participant is in room and not eliminated
    participant = db.table("participants").select("*").eq("room_id", room["id"]).eq("user_id", current_user["id"]).execute().data
    if not participant:
        raise HTTPException(status_code=403, detail="You are not in this room")
    if participant[0].get("eliminated"):
        raise HTTPException(status_code=403, detail="You have been eliminated")

    # Check for existing submission this round (one per participant per round)
    existing = db.table("submissions").select("id").eq("round_id", data.round_id).eq("user_id", current_user["id"]).execute().data
    if existing:
        raise HTTPException(status_code=400, detail="You already submitted for this round")

    # Validate prompt
    if len(data.prompt.strip()) < 10:
        raise HTTPException(status_code=400, detail="Prompt too short (min 10 characters)")

    submission_id = str(uuid.uuid4())
    submission = db.table("submissions").insert({
        "id": submission_id,
        "round_id": data.round_id,
        "room_id": room["id"],
        "user_id": current_user["id"],
        "username": current_user["username"],
        "prompt": data.prompt,
        "status": "queued",
    }).execute().data[0]

    await emit_room_update(room["id"], {"event": "submission_created", "submission": submission})

    # Fire-and-forget async generation job
    background_tasks.add_task(
        run_generation_job,
        submission_id=submission_id,
        room_id=room["id"],
        challenge=room["challenge_prompt"],
        participant_prompt=data.prompt,
    )

    return submission


@router.post("/{submission_id}/retry")
async def retry_submission(
    submission_id: str,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user),
):
    db = get_supabase()

    sub = db.table("submissions").select("*, rounds(*, rooms(*))").eq("id", submission_id).execute().data
    if not sub:
        raise HTTPException(status_code=404, detail="Submission not found")
    sub = sub[0]

    if sub["user_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="Not your submission")

    if sub["status"] not in ("failed", "timed_out"):
        raise HTTPException(status_code=400, detail="Can only retry failed or timed-out submissions")

    # Reset to queued
    db.table("submissions").update({"status": "queued", "error_message": None}).eq("id", submission_id).execute()

    room = sub["rounds"]["rooms"]
    background_tasks.add_task(
        run_generation_job,
        submission_id=submission_id,
        room_id=room["id"],
        challenge=room["challenge_prompt"],
        participant_prompt=sub["prompt"],
    )

    return {"message": "Retry queued", "submission_id": submission_id}


@router.post("/{submission_id}/score")
async def score_submission(
    submission_id: str,
    data: ScoreSubmission,
    current_user: dict = Depends(get_current_user),
):
    db = get_supabase()

    sub = db.table("submissions").select("*, rounds(*, rooms(*))").eq("id", submission_id).execute().data
    if not sub:
        raise HTTPException(status_code=404, detail="Submission not found")
    sub = sub[0]

    room = sub["rounds"]["rooms"]
    if room["host_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="Only the host can score submissions")

    if data.score < 0 or data.score > 100:
        raise HTTPException(status_code=400, detail="Score must be 0-100")

    updated = db.table("submissions").update({
        "score": data.score,
        "eliminated": data.eliminated,
        "judge_notes": data.judge_notes,
    }).eq("id", submission_id).execute().data[0]

    # Update participant elimination status
    if data.eliminated:
        db.table("participants").update({"eliminated": True}).eq("room_id", room["id"]).eq("user_id", sub["user_id"]).execute()

    await emit_score_update(room["id"], {
        "submission_id": submission_id,
        "score": data.score,
        "eliminated": data.eliminated,
        "username": sub["username"],
        "judge_notes": data.judge_notes,
    })

    return updated
