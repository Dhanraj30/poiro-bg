-- ============================================================
--  Poiro Battle Room – Supabase Schema
--  Run this in the Supabase SQL editor
-- ============================================================

-- Users (we manage auth ourselves with bcrypt + JWT)
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  username    TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms
CREATE TABLE IF NOT EXISTS rooms (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  challenge_prompt  TEXT NOT NULL,
  host_id           UUID NOT NULL REFERENCES users(id),
  code              TEXT UNIQUE NOT NULL,
  status            TEXT NOT NULL DEFAULT 'waiting'
                      CHECK (status IN ('waiting','active','scoring','finished')),
  max_participants  INT DEFAULT 10,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Participants
CREATE TABLE IF NOT EXISTS participants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id     UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id),
  username    TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'participant'
                CHECK (role IN ('host','participant','spectator')),
  score       INT DEFAULT 0,
  eliminated  BOOLEAN DEFAULT FALSE,
  joined_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(room_id, user_id)
);

-- Rounds
CREATE TABLE IF NOT EXISTS rounds (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id            UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  round_number       INT NOT NULL,
  status             TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','active','closed','scored')),
  time_limit_seconds INT DEFAULT 120,
  started_at         TIMESTAMPTZ,
  ended_at           TIMESTAMPTZ,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- Submissions (each participant's entry per round)
CREATE TABLE IF NOT EXISTS submissions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  round_id         UUID NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
  room_id          UUID NOT NULL REFERENCES rooms(id),
  user_id          UUID NOT NULL REFERENCES users(id),
  username         TEXT NOT NULL,
  prompt           TEXT NOT NULL,
  generated_output TEXT,
  status           TEXT NOT NULL DEFAULT 'queued'
                     CHECK (status IN ('queued','running','completed','failed','timed_out')),
  error_message    TEXT,
  score            INT CHECK (score BETWEEN 0 AND 100),
  judge_notes      TEXT,
  eliminated       BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_participants_room ON participants(room_id);
CREATE INDEX IF NOT EXISTS idx_rounds_room ON rounds(room_id);
CREATE INDEX IF NOT EXISTS idx_submissions_round ON submissions(round_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_rooms_code ON rooms(code);
