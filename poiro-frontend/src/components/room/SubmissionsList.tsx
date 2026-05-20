import { useState } from 'react'
import { Submission } from '@/types'
import { submissionsApi } from '@/lib/api'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import { ChevronDown, ChevronUp, Star, Skull, Loader2, RefreshCw } from 'lucide-react'

const STATUS_STYLE = {
  queued: 'bg-battle-border text-battle-muted',
  running: 'bg-battle-neon/10 text-battle-neon border border-battle-neon/30 animate-pulse',
  completed: 'bg-battle-green/10 text-battle-green border border-battle-green/30',
  failed: 'bg-battle-red/10 text-battle-red border border-battle-red/30',
  timed_out: 'bg-battle-accent/10 text-battle-accent border border-battle-accent/30',
}

function ScoreModal({
  submission,
  onScore,
  onClose,
}: {
  submission: Submission
  onScore: (score: number, eliminated: boolean, notes: string) => void
  onClose: () => void
}) {
  const [score, setScore] = useState(50)
  const [eliminated, setEliminated] = useState(false)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submissionsApi.score(submission.id, {
        submission_id: submission.id,
        score,
        eliminated,
        judge_notes: notes || undefined,
      })
      onScore(score, eliminated, notes)
      toast.success(`Scored ${submission.username}: ${score}/100`)
      onClose()
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Scoring failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="battle-card p-6 w-full max-w-md animate-slide-up">
        <h3 className="font-display text-xl text-battle-text tracking-wide mb-4">
          JUDGE: {submission.username.toUpperCase()}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-battle-textDim mb-2 uppercase tracking-wider">
              Score: <span className="text-battle-gold text-lg ml-1">{score}</span>/100
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value))}
              className="w-full accent-battle-accent"
            />
            <div className="flex justify-between text-xs text-battle-muted mt-1">
              <span>0 — Weak</span>
              <span>50 — Decent</span>
              <span>100 — Legendary</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-battle-textDim mb-1.5 uppercase tracking-wider">Judge Notes (optional)</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-battle-surface border border-battle-border rounded-lg px-3 py-2 text-battle-text text-sm placeholder-battle-muted focus:outline-none focus:border-battle-accent resize-none"
              placeholder="Why did you give this score?"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={eliminated}
              onChange={(e) => setEliminated(e.target.checked)}
              className="w-4 h-4 accent-battle-red"
            />
            <span className="text-sm text-battle-red">☠️ Eliminate this fighter</span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-battle-border text-battle-textDim py-2.5 rounded-lg text-sm hover:border-battle-text transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-battle-accent hover:bg-battle-accentHover disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
              Confirm Score
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function SubmissionCard({
  submission,
  isHost,
  isOwn,
  roomStatus,
}: {
  submission: Submission
  isHost: boolean
  isOwn: boolean
  roomStatus: string
}) {
  const [expanded, setExpanded] = useState(submission.status === 'completed')
  const [showScore, setShowScore] = useState(false)

  const canScore = isHost && submission.status === 'completed' && submission.score === null && roomStatus === 'scoring'

  return (
    <>
      <div className={`battle-card overflow-hidden transition-all animate-fade-in ${
        submission.eliminated ? 'opacity-50' : ''
      } ${isOwn ? 'border-battle-accent/40' : ''}`}>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border flex-shrink-0 ${
                submission.eliminated
                  ? 'bg-battle-red/10 border-battle-red/30 text-battle-red'
                  : 'bg-battle-neonDim border-battle-neon/30 text-battle-neon'
              }`}>
                {submission.eliminated ? <Skull className="w-4 h-4" /> : submission.username[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-battle-text text-sm">{submission.username}</span>
                  {isOwn && <span className="text-xs text-battle-textDim">(you)</span>}
                  {submission.score !== null && (
                    <span className="text-xs bg-battle-gold/10 text-battle-gold border border-battle-gold/30 px-2 py-0.5 rounded font-mono">
                      {submission.score}/100
                    </span>
                  )}
                  {submission.eliminated && (
                    <span className="text-xs text-battle-red">☠️ Eliminated</span>
                  )}
                </div>
                <p className="text-xs text-battle-textDim truncate mt-0.5">{submission.prompt}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded font-mono ${STATUS_STYLE[submission.status]}`}>
                {submission.status}
              </span>

              {submission.status === 'completed' && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-battle-textDim hover:text-battle-text transition-colors"
                >
                  {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* Generation status indicator */}
          {submission.status === 'running' && (
            <div className="mt-3 flex items-center gap-2 text-battle-neon text-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>AI is generating creative output...</span>
            </div>
          )}

          {submission.status === 'queued' && (
            <div className="mt-3 text-battle-muted text-xs">⏳ Waiting in queue...</div>
          )}

          {(submission.status === 'failed' || submission.status === 'timed_out') && (
            <div className="mt-3 flex items-center gap-2 text-battle-red text-xs">
              <span>❌ {submission.error_message || 'Generation failed'}</span>
              {isOwn && (
                <button
                  onClick={async () => {
                    try {
                      await submissionsApi.retry(submission.id)
                      toast.success('Retry queued')
                    } catch {
                      toast.error('Retry failed')
                    }
                  }}
                  className="flex items-center gap-1 text-battle-accent hover:underline ml-auto"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              )}
            </div>
          )}

          {/* Score button */}
          {canScore && (
            <button
              onClick={() => setShowScore(true)}
              className="mt-3 flex items-center gap-1.5 text-sm bg-battle-accent/10 hover:bg-battle-accent/20 border border-battle-accent text-battle-accent px-3 py-1.5 rounded-lg transition-all"
            >
              <Star className="w-3.5 h-3.5" />
              Judge this submission
            </button>
          )}

          {submission.judge_notes && (
            <p className="mt-2 text-xs text-battle-textDim italic border-l-2 border-battle-border pl-2">
              "{submission.judge_notes}"
            </p>
          )}
        </div>

        {/* Expanded output */}
        {expanded && submission.generated_output && (
          <div className="border-t border-battle-border p-4 bg-battle-surface/50">
            <p className="text-xs text-battle-textDim mb-3 uppercase tracking-wider font-medium">AI Generated Output</p>
            <div className="prose prose-invert prose-sm max-w-none text-battle-text">
              <ReactMarkdown>{submission.generated_output}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {showScore && (
        <ScoreModal
          submission={submission}
          onScore={() => {}}
          onClose={() => setShowScore(false)}
        />
      )}
    </>
  )
}

interface Props {
  submissions: Submission[]
  isHost: boolean
  currentUserId: string | undefined
  roomStatus: string
}

export function SubmissionsList({ submissions, isHost, currentUserId, roomStatus }: Props) {
  if (submissions.length === 0) {
    return (
      <div className="battle-card p-8 text-center">
        <p className="text-3xl mb-3">🎯</p>
        <p className="text-battle-textDim text-sm">No submissions yet. Fighters are crafting their prompts...</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="font-display text-xl text-battle-text tracking-wide mb-4">
        SUBMISSIONS <span className="text-battle-muted text-base">({submissions.length})</span>
      </h3>
      <div className="space-y-4">
        {submissions.map((sub) => (
          <SubmissionCard
            key={sub.id}
            submission={sub}
            isHost={isHost}
            isOwn={sub.user_id === currentUserId}
            roomStatus={roomStatus}
          />
        ))}
      </div>
    </div>
  )
}
