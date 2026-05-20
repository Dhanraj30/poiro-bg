import uuid
from fastapi import APIRouter, HTTPException, Depends
from app.core.database import get_supabase
from app.core.auth import get_current_user
from app.core.socket_manager import emit_round_update, emit_room_update

router = APIRouter(prefix="/rounds", tags=["rounds"])


def _assert_host(room: dict, user_id: str):
    if room["host_id"] != user_id:
        raise HTTPException(status_code=403, detail="Only the host can perform this action")


@router.post("/start")
async def start_round(room_id: str, current_user: dict = Depends(get_current_user)):
    db = get_supabase()

    room = db.table("rooms").select("*").eq("id", room_id).execute().data
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    room = room[0]
    _assert_host(room, current_user["id"])

    # Close any active rounds
    db.table("rounds").update({"status": "closed"}).eq("room_id", room_id).eq("status", "active").execute()

    # Get round number
    existing = db.table("rounds").select("round_number").eq("room_id", room_id).order("round_number", desc=True).execute().data
    round_number = (existing[0]["round_number"] + 1) if existing else 1

    round_id = str(uuid.uuid4())
    new_round = db.table("rounds").insert({
        "id": round_id,
        "room_id": room_id,
        "round_number": round_number,
        "status": "active",
        "time_limit_seconds": 120,
    }).execute().data[0]

    # Update room status
    db.table("rooms").update({"status": "active"}).eq("id", room_id).execute()

    await emit_round_update(room_id, {**new_round, "event": "round_started"})
    await emit_room_update(room_id, {"status": "active", "event": "room_activated"})

    return new_round


@router.post("/{round_id}/close")
async def close_round(round_id: str, current_user: dict = Depends(get_current_user)):
    db = get_supabase()

    round_ = db.table("rounds").select("*, rooms(*)").eq("id", round_id).execute().data
    if not round_:
        raise HTTPException(status_code=404, detail="Round not found")
    round_ = round_[0]
    _assert_host(round_["rooms"], current_user["id"])

    updated = db.table("rounds").update({"status": "closed"}).eq("id", round_id).execute().data[0]
    db.table("rooms").update({"status": "scoring"}).eq("id", round_["room_id"]).execute()

    await emit_round_update(round_["room_id"], {**updated, "event": "round_closed"})

    return updated


@router.get("/{round_id}/submissions")
async def get_round_submissions(round_id: str, current_user: dict = Depends(get_current_user)):
    db = get_supabase()
    submissions = db.table("submissions").select("*, users(username)").eq("round_id", round_id).execute().data
    return submissions
