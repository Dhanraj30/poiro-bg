import { useState } from 'react'
import { submissionsApi } from '@/lib/api'
import { Submission } from '@/types'
import { useRoomStore } from '@/store/roomStore'
import toast from 'react-hot-toast'
import { Send, RefreshCw, Loader2 } from 'lucide-react'

const JOB_STATUS_INFO = {
  queued: { label: 'Queued — waiting for AI...', color: 'text-battle-muted', icon: '⏳' },
  running: { label: 'AI is generating your creative output...', color: 'text-battle-neon', icon: '⚡' },
  completed: { label: 'Generation complete!', color: 'text-battle-green', icon: '✅' },
  failed: { label: 'Generation failed.', color: 'text-battle-red', icon: '❌' },
  timed_out: { label: 'Generation timed out.', color: 'text-battle-accent', icon: '⏱️' },
}

interface Props {
  roundId: string
  existingSubmission: Submission | null | undefined
}

export function SubmitPromptForm({ roundId, existingSubmission }: Props) {
  const [prompt, setPrompt] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [retrying, setRetrying] = useState(false)
  const { addSubmission } = useRoomStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim().length < 10) {
      toast.error('Prompt too short (min 10 characters)')
      return
    }
    setSubmitting(true)
    try {
      const res = await submissionsApi.create({ prompt: prompt.trim(), round_id: roundId })
      addSubmission(res.data)
      setPrompt('')
      toast.success('Submitted! AI is generating...')
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetry = async () => {
    if (!existingSubmission) return
    setRetrying(true)
    try {
      await submissionsApi.retry(existingSubmission.id)
      toast.success('Retry queued!')
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Retry failed')
    } finally {
      setRetrying(false)
    }
  }

  if (existingSubmission) {
    const info = JOB_STATUS_INFO[existingSubmission.status]
    return (
      <div className="battle-card p-5">
        <h3 className="font-display text-lg text-battle-text tracking-wide mb-3">YOUR SUBMISSION</h3>
        <div className="bg-battle-surface rounded-lg p-3 mb-3">
          <p className="text-xs text-battle-textDim mb-1">Your prompt:</p>
          <p className="text-battle-text text-sm">{existingSubmission.prompt}</p>
        </div>

        <div className={`flex items-center gap-2 text-sm ${info.color}`}>
          {existingSubmission.status === 'running' && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          <span>{info.icon} {info.label}</span>
        </div>

        {existingSubmission.error_message && (
          <p className="text-battle-red text-xs mt-2 font-mono">{existingSubmission.error_message}</p>
        )}

        {(existingSubmission.status === 'failed' || existingSubmission.status === 'timed_out') && (
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="mt-3 flex items-center gap-2 text-sm bg-battle-accent/10 border border-battle-accent text-battle-accent px-3 py-2 rounded-lg hover:bg-battle-accent/20 transition-all disabled:opacity-50"
          >
            {retrying ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Retry Generation
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="battle-card p-5">
      <h3 className="font-display text-lg text-battle-text tracking-wide mb-4">SUBMIT YOUR CREATIVE DIRECTION</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your creative direction for the AI to generate from... Be bold, specific, and unexpected."
          className="w-full bg-battle-surface border border-battle-border rounded-lg px-4 py-3 text-battle-text placeholder-battle-muted focus:outline-none focus:border-battle-accent transition-colors resize-none text-sm"
        />
        <div className="flex items-center justify-between">
          <span className={`text-xs ${prompt.length < 10 ? 'text-battle-muted' : 'text-battle-green'}`}>
            {prompt.length} / 10 min chars
          </span>
          <button
            type="submit"
            disabled={submitting || prompt.trim().length < 10}
            className="flex items-center gap-2 bg-battle-accent hover:bg-battle-accentHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {submitting ? 'Submitting...' : 'Submit to Battle'}
          </button>
        </div>
      </form>
    </div>
  )
}
