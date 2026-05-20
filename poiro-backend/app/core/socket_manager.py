import socketio
from typing import Any

# Async Socket.IO server — mounted alongside FastAPI via ASGI
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    logger=False,
    engineio_logger=False,
)


# ─── Room namespace helpers ──────────────────────────────────────────────────

async def emit_to_room(room_id: str, event: str, data: Any):
    """Broadcast an event to everyone in a Socket.IO room."""
    await sio.emit(event, data, room=f"room:{room_id}")


async def emit_job_update(room_id: str, submission_id: str, status: str, output: str | None = None, error: str | None = None):
    await emit_to_room(room_id, "job_update", {
        "submission_id": submission_id,
        "status": status,
        "output": output,
        "error": error,
    })


async def emit_round_update(room_id: str, round_data: dict):
    await emit_to_room(room_id, "round_update", round_data)


async def emit_room_update(room_id: str, room_data: dict):
    await emit_to_room(room_id, "room_update", room_data)


async def emit_score_update(room_id: str, score_data: dict):
    await emit_to_room(room_id, "score_update", score_data)


# ─── Socket.IO event handlers ────────────────────────────────────────────────

@sio.event
async def connect(sid, environ, auth):
    print(f"[WS] Client connected: {sid}")


@sio.event
async def disconnect(sid):
    print(f"[WS] Client disconnected: {sid}")


@sio.event
async def join_room(sid, data):
    """Client joins a Socket.IO room to receive room-specific events."""
    room_id = data.get("room_id")
    if room_id:
        await sio.enter_room(sid, f"room:{room_id}")
        await sio.emit("joined", {"room_id": room_id, "message": "Joined room successfully"}, to=sid)
        print(f"[WS] {sid} joined room:{room_id}")


@sio.event
async def leave_room(sid, data):
    room_id = data.get("room_id")
    if room_id:
        await sio.leave_room(sid, f"room:{room_id}")
