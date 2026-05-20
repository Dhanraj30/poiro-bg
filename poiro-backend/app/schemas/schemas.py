from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum


# ─── Auth ───────────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    username: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


# ─── Room ───────────────────────────────────────────────────────────────────

class RoomStatus(str, Enum):
    waiting = "waiting"
    active = "active"
    scoring = "scoring"
    finished = "finished"


class RoomCreate(BaseModel):
    name: str
    challenge_prompt: str
    max_participants: int = 10


class RoomJoin(BaseModel):
    room_code: str


# ─── Round ──────────────────────────────────────────────────────────────────

class RoundStatus(str, Enum):
    pending = "pending"
    active = "active"
    closed = "closed"
    scored = "scored"


# ─── Submission ─────────────────────────────────────────────────────────────

class SubmissionCreate(BaseModel):
    prompt: str
    round_id: str


class JobStatus(str, Enum):
    queued = "queued"
    running = "running"
    completed = "completed"
    failed = "failed"
    timed_out = "timed_out"


# ─── Scoring ────────────────────────────────────────────────────────────────

class ScoreSubmission(BaseModel):
    submission_id: str
    score: int  # 0-100
    eliminated: bool = False
    judge_notes: Optional[str] = None
