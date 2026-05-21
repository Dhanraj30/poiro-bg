import { Participant, Submission, Round } from '@/types'
import { Crown, Skull, Clock, CheckCircle2 } from 'lucide-react'

interface Props {
  participants: Participant[]
  submissions: Submission[]
  currentUserId: string | undefined
  activeRound: Round | null
}

export function ParticipantsList({ participants, submissions, currentUserId, activeRound }: Props) {
  const getSubmissionStatus = (userId: string) => {
    if (!activeRound) return null
    return submissions.find((s) => s.round_id === activeRound.id && s.user_id === userId)
  }

  const fighters = participants.filter((p) => p.role !== 'host')
  const host = participants.find((p) => p.role === 'host')

  return (
    <div className="battle-card p-4">
      <h3 className="font-display text-lg text-battle-text tracking-wide mb-4">FIGHTERS</h3>

      {/* Host */}
      {host && (
        <div className="mb-4 pb-4 border-b border-battle-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-battle-accent/20 rounded-none flex items-center justify-center border border-battle-accent/40">
              <Crown className="w-4 h-4 text-battle-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-mono tracking-widest uppercase text-battle-text truncate">{host.username}</p>
              <p className="text-xs text-battle-accent">Host</p>
            </div>
            {host.user_id === currentUserId && (
              <span className="text-xs text-battle-textDim">(you)</span>
            )}
          </div>
        </div>
      )}

      {/* Fighters */}
      <div className="space-y-2">
        {fighters.length === 0 && (
          <p className="text-battle-muted text-xs text-center py-4">No fighters yet. Share the room code!</p>
        )}

        {fighters.map((p) => {
          const sub = getSubmissionStatus(p.user_id)
          const isMe = p.user_id === currentUserId

          return (
            <div
              key={p.id}
              className={`flex items-center gap-2.5 p-2.5 rounded-none transition-colors ${
                p.eliminated ? 'opacity-40' : 'hover:bg-battle-surface'
              } ${isMe ? 'bg-battle-surface' : ''}`}
            >
              <div className={`w-8 h-8 rounded-none flex items-center justify-center text-xs font-bold border ${
                p.eliminated
                  ? 'bg-battle-red/10 border-battle-red/30 text-battle-red'
                  : 'bg-battle-neonDim border-battle-neon/30 text-battle-neon'
              }`}>
                {p.eliminated ? <Skull className="w-4 h-4" /> : p.username[0].toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className={`text-sm font-mono tracking-widest uppercase truncate ${p.eliminated ? 'line-through text-battle-muted' : 'text-battle-text'}`}>
                    {p.username}
                  </p>
                  {isMe && <span className="text-xs text-battle-textDim">(you)</span>}
                </div>
                {p.score > 0 && (
                  <p className="text-xs text-battle-gold">Score: {p.score}</p>
                )}
              </div>

              {/* Submission indicator */}
              {activeRound && activeRound.status === 'active' && (
                <div title={sub ? `${sub.status}` : 'not submitted'}>
                  {sub ? (
                    <CheckCircle2 className={`w-4 h-4 ${
                      sub.status === 'completed' ? 'text-battle-green' :
                      sub.status === 'running' ? 'text-battle-neon animate-pulse' :
                      sub.status === 'queued' ? 'text-battle-muted' :
                      'text-battle-red'
                    }`} />
                  ) : (
                    <Clock className="w-4 h-4 text-battle-border" />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
