export type JobStatus = 'queued' | 'running' | 'completed' | 'failed' | 'timed_out'
export type RoomStatus = 'waiting' | 'active' | 'scoring' | 'finished'
export type RoundStatus = 'pending' | 'active' | 'closed' | 'scored'
export type ParticipantRole = 'host' | 'participant' | 'spectator'

export interface User {
  id: string
  email: string
  username: string
}

export interface Participant {
  id: string
  room_id: string
  user_id: string
  username: string
  role: ParticipantRole
  score: number
  eliminated: boolean
  joined_at: string
}

export interface Room {
  id: string
  name: string
  challenge_prompt: string
  host_id: string
  code: string
  status: RoomStatus
  max_participants: number
  created_at: string
  participants: Participant[]
  rounds: Round[]
  active_round: Round | null
  submissions: Submission[]
}

export interface Round {
  id: string
  room_id: string
  round_number: number
  status: RoundStatus
  time_limit_seconds: number
  started_at: string | null
  ended_at: string | null
  created_at: string
}

export interface Submission {
  id: string
  round_id: string
  room_id: string
  user_id: string
  username: string
  prompt: string
  generated_output: string | null
  status: JobStatus
  error_message: string | null
  score: number | null
  judge_notes: string | null
  eliminated: boolean
  created_at: string
  updated_at: string
}
