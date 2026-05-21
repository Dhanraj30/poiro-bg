import { useState } from 'react'
import { Room } from '@/types'
import { roundsApi } from '@/lib/api'
import toast from 'react-hot-toast'
import { Play, Square, Loader2 } from 'lucide-react'

interface Props {
  room: Room
  isHost: boolean
}

export function RoundPanel({ room, isHost }: Props) {
  const [loading, setLoading] = useState(false)

  const startRound = async () => {
    setLoading(true)
    try {
      await roundsApi.start(room.id)
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to start round')
    } finally {
      setLoading(false)
    }
  }

  const closeRound = async () => {
    if (!room.active_round) return
    setLoading(true)
    try {
      await roundsApi.close(room.active_round.id)
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to close round')
    } finally {
      setLoading(false)
    }
  }

  const activeRound = room.active_round

  return (
    <div className="battle-card p-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          {activeRound ? (
            <>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display text-xl text-battle-text tracking-wide">
                  ROUND {activeRound.round_number}
                </span>
                <span className={`text-xs font-mono border px-2 py-0.5 rounded-none uppercase tracking-widest ${
                  activeRound.status === 'active' ? 'text-battle-neon border-battle-neon animate-pulse glow-cyan' :
                  activeRound.status === 'closed' ? 'text-battle-gold border-battle-gold' :
                  'text-battle-muted border-battle-muted'
                }`}>
                  {activeRound.status}
                </span>
              </div>
              {activeRound.status === 'active' && (
                <p className="text-battle-textDim text-sm">
                  {room.submissions.filter((s) => s.round_id === activeRound.id).length} submission(s) received
                </p>
              )}
            </>
          ) : (
            <div>
              <p className="font-display text-xl text-battle-text tracking-wide">NO ACTIVE ROUND</p>
              <p className="text-battle-textDim text-sm">
                {room.rounds.length === 0 ? 'Start the first round to begin.' : `${room.rounds.length} round(s) completed.`}
              </p>
            </div>
          )}
        </div>

        {isHost && (
          <div className="flex gap-3">
            {(!activeRound || activeRound.status !== 'active') && room.status !== 'finished' && (
              <button
                onClick={startRound}
                disabled={loading}
                className="flex items-center gap-2 bg-battle-neon/10 hover:bg-battle-neon/20 border border-battle-neon text-battle-neon px-4 py-2.5 rounded-none font-display font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-50 glow-cyan"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {activeRound ? 'Next Round' : 'Start Round'}
              </button>
            )}

            {activeRound?.status === 'active' && (
              <button
                onClick={closeRound}
                disabled={loading}
                className="flex items-center gap-2 bg-battle-gold/10 hover:bg-battle-gold/20 border border-battle-gold text-battle-gold px-4 py-2.5 rounded-none font-display font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4" />}
                Close Round
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
