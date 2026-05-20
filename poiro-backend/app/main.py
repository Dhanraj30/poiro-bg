from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio

from app.core.config import get_settings
from app.core.socket_manager import sio
from app.routers import auth, rooms, rounds, submissions

settings = get_settings()

# ─── FastAPI app ─────────────────────────────────────────────────────────────

app = FastAPI(
    title="Poiro Battle Room API",
    description="Real-time AI creative battle platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────────────────

app.include_router(auth.router, prefix="/api")
app.include_router(rooms.router, prefix="/api")
app.include_router(rounds.router, prefix="/api")
app.include_router(submissions.router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"status": "ok", "app": settings.app_name}


# ─── Mount Socket.IO as ASGI sub-app ─────────────────────────────────────────

socket_app = socketio.ASGIApp(sio, other_asgi_app=app, socketio_path="/socket.io")

# Export `socket_app` as the ASGI entrypoint (used by uvicorn)
