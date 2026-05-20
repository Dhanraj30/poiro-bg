import { useParams, useNavigate } from 'react-router-dom'
import { useRoom } from '@/hooks/useRoom'
import { useAuthStore } from '@/store/authStore'
import { RoomHeader } from '@/components/room/RoomHeader'
import { ParticipantsList } from '@/components/room/ParticipantsList'
import { RoundPanel } from '@/components/room/RoundPanel'
import { SubmissionsList } from '@/components/room/SubmissionsList'
import { SubmitPromptForm } from '@/components/room/SubmitPromptForm'
import { Loader2 } from 'lucide-react'

export function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { room, isConnected } = useRoom(roomId)

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-battle-bg">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-battle-neon animate-spin mx-auto mb-4" />
          <p className="text-battle-textDim">Loading battle room...</p>
        </div>
      </div>
    )
  }

  const isHost = room.host_id === user?.id
  const myParticipant = room.participants.find((p) => p.user_id === user?.id)
  const isEliminated = myParticipant?.eliminated ?? false
  const mySubmission = room.active_round
    ? room.submissions.find((s) => s.round_id === room.active_round!.id && s.user_id === user?.id)
    : null

  return (
    <div className="min-h-screen bg-battle-bg flex flex-col">
      <RoomHeader
        room={room}
        isHost={isHost}
        isConnected={isConnected}
        onBack={() => navigate('/')}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Left sidebar: participants */}
        <div className="xl:col-span-1">
          <ParticipantsList
            participants={room.participants}
            submissions={room.submissions}
            currentUserId={user?.id}
            activeRound={room.active_round}
          />
        </div>

        {/* Main area */}
        <div className="xl:col-span-3 space-y-6">
          {/* Challenge Banner */}
          <div className="battle-card p-5 border-l-4 border-battle-accent">
            <p className="text-xs font-medium text-battle-accent uppercase tracking-wider mb-2">⚔️ Battle Challenge</p>
            <p className="text-battle-text font-medium leading-relaxed">{room.challenge_prompt}</p>
          </div>

          {/* Round Controls (host) / Round Info */}
          <RoundPanel room={room} isHost={isHost} />

          {/* Submit form (participants only, during active round) */}
          {!isHost && room.active_round?.status === 'active' && !isEliminated && (
            <SubmitPromptForm
              roundId={room.active_round.id}
              existingSubmission={mySubmission}
            />
          )}

          {isEliminated && (
            <div className="battle-card p-5 border border-battle-red/30 bg-battle-red/5 text-center">
              <p className="text-2xl mb-2">☠️</p>
              <p className="text-battle-red font-semibold">You have been eliminated</p>
              <p className="text-battle-textDim text-sm mt-1">Better luck next round, fighter.</p>
            </div>
          )}

          {/* Submissions */}
          {(room.submissions.length > 0 || room.active_round) && (
            <SubmissionsList
              submissions={room.submissions}
              isHost={isHost}
              currentUserId={user?.id}
              roomStatus={room.status}
            />
          )}
        </div>
      </main>
    </div>
  )
}
