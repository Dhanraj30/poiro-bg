# POIRO — AI Creative Battle Room

> A real-time AI-powered competitive creative platform. Hosts create challenges, participants submit creative prompts, Gemini AI generates outputs, and the host judges/eliminates fighters.

---

## Quick Start

### 1. Clone and configure

```bash
git clone <repo>
cd poiro

# Backend env
cp poiro-backend/.env.example poiro-backend/.env
# Fill in: SUPABASE_URL, SUPABASE_SERVICE_KEY, SUPABASE_ANON_KEY, GEMINI_API_KEY
# Optional: GEMINI_MODEL defaults to gemini-2.5-flash

# Frontend env (for local dev without Docker)
cp poiro-frontend/.env.example poiro-frontend/.env
```

### 2. Set up Supabase database

- Create a project at https://supabase.com
- Go to SQL Editor → paste the contents of `poiro-backend/schema.sql` → Run
- Copy your project URL and service role key into `poiro-backend/.env`

### 3a. Run with Docker (recommended)

```bash
# Production build
docker compose up --build

# Development with hot reload
docker compose -f docker-compose.dev.yml up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### 3b. Run locally without Docker

**Backend:**
```bash
cd poiro-backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:socket_app --host 0.0.0.0 --port 8000 --reload
```

**Frontend:**
```bash
cd poiro-frontend
npm install
npm run dev
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser Clients                          │
│                   React + Zustand + Socket.IO                   │
└──────────────────────┬──────────────────────┬───────────────────┘
                       │  HTTP (REST)          │  WebSocket
                       ▼                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    FastAPI + Socket.IO ASGI                      │
│                                                                  │
│  /api/auth      → JWT auth (bcrypt + jose)                       │
│  /api/rooms     → Room lifecycle                                 │
│  /api/rounds    → Round control (host-only)                      │
│  /api/submissions → Submit + Score                               │
│                                                                  │
│  BackgroundTasks → run_generation_job()  (async, non-blocking)  │
└───────────┬──────────────────────────┬───────────────────────────┘
            │  supabase-py             │  google-generativeai
            ▼                          ▼
┌───────────────────┐       ┌──────────────────────┐
│   Supabase        │       │  Gemini 2.5 Flash     │
│  (PostgreSQL)     │       │  (or MockProvider)    │
└───────────────────┘       └──────────────────────┘
```

### Key design decisions

| Decision | Choice | Rationale |
|---|---|---|
| Realtime | Socket.IO (python-socketio ASGI) | Battle events need push, not poll. ASGI mount keeps it one process. |
| Auth | Custom bcrypt + JWT | No external OAuth needed; tokens persist across refresh via localStorage + Zustand persist. |
| Async jobs | FastAPI BackgroundTasks | Lightweight; no separate worker process needed for this scale. Upgradeable to Celery/RQ easily. |
| DB | Supabase (Postgres) | Free tier, instant setup, row-level security available, SQL schema is clean. |
| AI | Gemini 2.5 Flash -> MockProvider fallback | Fast, free-tier friendly; mock provider means the app still works if the key/model/API call is unavailable. |

---

## Database Schema

```
users           → id, email, username, password_hash
rooms           → id, name, challenge_prompt, host_id, code (6-char), status
participants    → id, room_id, user_id, role (host/participant), score, eliminated
rounds          → id, room_id, round_number, status (pending/active/closed/scored)
submissions     → id, round_id, room_id, user_id, prompt, generated_output,
                   status (queued/running/completed/failed/timed_out),
                   score (0-100), eliminated, judge_notes
```

---

## Realtime Event Model

All events are Socket.IO events emitted to a room channel `room:{room_id}`.

| Event | Payload | When |
|---|---|---|
| `room_update` | `{ status, event }` | Room status changes, participant joins |
| `round_update` | `{ ...round, event }` | Round started, closed |
| `job_update` | `{ submission_id, status, output, error }` | Generation state transitions |
| `score_update` | `{ submission_id, score, eliminated, username }` | Host scores a submission |

Clients emit:
- `join_room { room_id }` → enters the Socket.IO room to receive events
- `leave_room { room_id }` → leaves the room

---

## Generation Job Lifecycle

```
POST /submissions
       │
       ▼
  status = "queued"  ──► BackgroundTask fires (non-blocking return to client)
       │
       ▼
  status = "running"  ──► emit job_update(running) via Socket.IO
       │
       ├─ success ──► status = "completed", generated_output saved
       │              emit job_update(completed, output)
       │
       ├─ provider error ──► status = "failed", error_message saved
       │                     emit job_update(failed, error)
       │
       └─ timeout (30s) ──► status = "timed_out"
                            emit job_update(timed_out)
                            ↓
                   POST /submissions/{id}/retry  ──► loops back to queued
```

---

## AI Provider

POIRO uses Gemini for real AI generation when `GEMINI_API_KEY` is set.

Current local default:

```env
GEMINI_MODEL=gemini-2.5-flash
```

`gemini-2.5-flash` is a stable Gemini text model with strong price/performance for low-latency creative generation. If `GEMINI_API_KEY` is empty, Gemini returns an empty response, the model is unavailable, or the API call raises an error, the backend automatically falls back to `MockProvider` and still completes the submission.

Gemini setup:

1. Create or copy an API key from Google AI Studio.
2. Put it in `poiro-backend/.env` as `GEMINI_API_KEY`.
3. Optionally change `GEMINI_MODEL`; keep `gemini-2.5-flash` unless you have a reason to use another model.
4. Restart the backend after changing `.env`.

Official docs:
- Gemini models: https://ai.google.dev/gemini-api/docs/models
- Gemini pricing/free tier details: https://ai.google.dev/gemini-api/docs/pricing

---

## Battle / Judging Mechanism

### Chosen approach: Host-judged scoring (0–100 slider + elimination)

Each submission gets a 0–100 score from the host with optional judge notes, plus an optional elimination flag.

**Why:** Keeps the battle feeling live and subjective — the host acts as a creative director, which fits "AI creative battle" better than algorithmic scoring.

**Weaknesses:**
- Single judge = bias, no peer pressure
- No rubric enforcement — scores are arbitrary
- Host can be slow, stalling the room

**Production improvements:**
- Add peer voting (participants score each other's submissions, weighted)
- AI-assisted judging: ask Gemini to score each submission against the challenge on multiple dimensions (originality, fit, boldness) and average with host score
- Time-locked scoring window to prevent stalling
- Leaderboard across rounds with cumulative scoring

---

## Persistence Model

**Persisted (Supabase):**
- Users, rooms, participants, rounds, submissions, job states, scores, elimination flags

**Not persisted:**
- Socket.IO room memberships (reconnect on refresh via `join_room`)
- In-flight generation tasks (if server restarts mid-job, submission stays `running`; a cron/startup sweep could reset stuck jobs)

---

## Failure Handling

| Failure | Handling |
|---|---|
| AI generation fails | Job → `failed`; error_message shown; retry button available |
| AI generation times out (30s) | Job → `timed_out`; same retry flow |
| Server restart mid-job | Submission stays `running` in DB — add a startup sweep to reset to `failed` in production |
| WebSocket disconnect | Socket.IO auto-reconnects (5 attempts); room state reloaded from HTTP on reconnect |
| Invalid room code | 404 with user-friendly message |
| Duplicate submission | 400 — one submission per participant per round enforced on backend |
| Host tries to submit | 403 — enforced on backend, not just UI |
| Eliminated participant tries to submit | 403 — enforced on backend |

---

## Role & Permission Enforcement

All role checks are **backend-enforced**, not just hidden in UI:

- `start_round`, `close_round`, `score_submission` → 403 if not host
- `create_submission` → 403 if host, 403 if eliminated, 400 if round not active
- Participants cannot access host-only endpoints at all

---

## Known Limitations

- No WebSocket reconnection recovery for long-disconnects (page refresh restores state from HTTP)
- Stuck `running` jobs if server crashes mid-generation (no startup cleanup sweep yet)
- No spectator mode
- No pagination on submissions/rooms for very large rooms
- No rate limiting on submission retries

---

## What I'd Improve With More Time

1. **Celery + Redis** for durable job queue with retry/backoff and stuck-job recovery
2. **AI scoring assistant** — Gemini judges submissions on challenge fit, originality, boldness (0-100 per dimension)
3. **Spectator mode** with emoji reactions that pulse in realtime
4. **Round timer** — countdown visible to all participants, auto-closes round at 0
5. **Event sourcing** — full activity log of every room event for replay
6. **Hosted deployment** — Fly.io (backend) + Vercel (frontend) with env secrets

---

## Environment Variables

### Backend (`poiro-backend/.env`)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=change-this-in-production
GEMINI_API_KEY=your-gemini-key        # Leave empty to use MockProvider
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

### Frontend (`poiro-frontend/.env`)

```env
VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
```
