import { create } from 'zustand'
import { Room, Submission, Round } from '@/types'

interface RoomState {
  room: Room | null
  isConnected: boolean
  setRoom: (room: Room) => void
  updateRoomStatus: (status: Room['status']) => void
  addParticipant: (participant: any) => void
  setActiveRound: (round: Round) => void
  updateRound: (round: Partial<Round> & { id: string }) => void
  addSubmission: (submission: Submission) => void
  updateSubmission: (id: string, updates: Partial<Submission>) => void
  setConnected: (v: boolean) => void
  reset: () => void
}

export const useRoomStore = create<RoomState>((set) => ({
  room: null,
  isConnected: false,

  setRoom: (room) => set({ room }),

  updateRoomStatus: (status) =>
    set((state) => state.room ? { room: { ...state.room, status } } : {}),

  addParticipant: (participant) =>
    set((state) => {
      if (!state.room) return {}
      const exists = state.room.participants.some((p) => p.user_id === participant.user_id)
      if (exists) return {}
      return { room: { ...state.room, participants: [...state.room.participants, participant] } }
    }),

  setActiveRound: (round) =>
    set((state) => {
      if (!state.room) return {}
      const rounds = state.room.rounds.filter((r) => r.id !== round.id)
      return { room: { ...state.room, active_round: round, rounds: [...rounds, round] } }
    }),

  updateRound: (updated) =>
    set((state) => {
      if (!state.room) return {}
      const rounds = state.room.rounds.map((r) => r.id === updated.id ? { ...r, ...updated } : r)
      const activeRound = state.room.active_round?.id === updated.id
        ? { ...state.room.active_round, ...updated }
        : state.room.active_round
      return { room: { ...state.room, rounds, active_round: activeRound } }
    }),

  addSubmission: (submission) =>
    set((state) => {
      if (!state.room) return {}
      const exists = state.room.submissions.some((s) => s.id === submission.id)
      if (exists) return {}
      return { room: { ...state.room, submissions: [...state.room.submissions, submission] } }
    }),

  updateSubmission: (id, updates) =>
    set((state) => {
      if (!state.room) return {}
      return {
        room: {
          ...state.room,
          submissions: state.room.submissions.map((s) => s.id === id ? { ...s, ...updates } : s),
        },
      }
    }),

  setConnected: (v) => set({ isConnected: v }),
  reset: () => set({ room: null, isConnected: false }),
}))
