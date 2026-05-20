import uuid
import random
import string
from fastapi import APIRouter, HTTPException, Depends
from app.schemas.schemas import RoomCreate, RoomJoin
from app.core.database import get_supabase
from app.core.auth import get_current_user
from app.core.socket_manager import emit_room_update

router = APIRouter(prefix="/rooms", tags=["rooms"])


def generate_room_code(length=6) -> str:
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))


@router.post("")
async def create_room(data: RoomCreate, current_user: dict = Depends(get_current_user)):
    db = get_supabase()
    room_id = str(uuid.uuid4())
    code = generate_room_code()

    # Ensure unique code
    while db.table("rooms").select("id").eq("code", code).execute().data:
        code = generate_room_code()

    room = db.table("rooms").insert({
        "id": room_id,
        "name": data.name,
        "challenge_prompt": data.challenge_prompt,
        "host_id": current_user["id"],
        "code": code,
        "status": "waiting",
        "max_participants": data.max_participants,
    }).execute().data[0]

    # Add host as participant with role=host
    db.table("participants").insert({
        "id": str(uuid.uuid4()),
        "room_id": room_id,
        "user_id": current_user["id"],
        "role": "host",
        "username": current_user["username"],
        "eliminated": False,
    }).execute()

    return room


@router.get("/{room_id}")
async def get_room(room_id: str, current_user: dict = Depends(get_current_user)):
    db = get_supabase()

    room = db.table("rooms").select("*").eq("id", room_id).execute().data
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    room = room[0]

    participants = db.table("participants").select("*, users(username, email)").eq("room_id", room_id).execute().data
    rounds = db.table("rounds").select("*").eq("room_id", room_id).order("round_number").execute().data
    
    active_round = next((r for r in rounds if r["status"] == "active"), None)
    if active_round is None and room["status"] == "scoring":
        active_round = next((r for r in reversed(rounds) if r["status"] == "closed"), None)

    submissions = db.table("submissions").select("*").eq("room_id", room_id).order("created_at").execute().data

    return {
        **room,
        "participants": participants,
        "rounds": rounds,
        "active_round": active_round,
        "submissions": submissions,
    }


@router.post("/join")
async def join_room(data: RoomJoin, current_user: dict = Depends(get_current_user)):
    db = get_supabase()

    room = db.table("rooms").select("*").eq("code", data.room_code.upper()).execute().data
    if not room:
        raise HTTPException(status_code=404, detail="Room not found with that code")
    room = room[0]

    if room["status"] == "finished":
        raise HTTPException(status_code=400, detail="This room has ended")

    # Check already joined
    existing = db.table("participants").select("id").eq("room_id", room["id"]).eq("user_id", current_user["id"]).execute().data
    if existing:
        return {"room_id": room["id"], "message": "Already in room"}

    # Check capacity
    count = len(db.table("participants").select("id").eq("room_id", room["id"]).execute().data)
    if count >= room["max_participants"]:
        raise HTTPException(status_code=400, detail="Room is full")

    db.table("participants").insert({
        "id": str(uuid.uuid4()),
        "room_id": room["id"],
        "user_id": current_user["id"],
        "role": "participant",
        "username": current_user["username"],
        "eliminated": False,
    }).execute()

    # Broadcast participant join
    await emit_room_update(room["id"], {"event": "participant_joined", "username": current_user["username"]})

    return {"room_id": room["id"], "message": "Joined successfully"}


@router.get("")
async def list_my_rooms(current_user: dict = Depends(get_current_user)):
    db = get_supabase()
    participated = db.table("participants").select("room_id").eq("user_id", current_user["id"]).execute().data
    room_ids = [p["room_id"] for p in participated]
    if not room_ids:
        return []
    rooms = db.table("rooms").select("*").in_("id", room_ids).order("created_at", desc=True).execute().data
    return rooms
