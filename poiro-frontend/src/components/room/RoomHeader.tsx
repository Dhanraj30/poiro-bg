import { Room } from '@/types'
import { ArrowLeft, Copy, Wifi, WifiOff, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

const STATUS_BADGE: Record<string, { label: string; class: string }> = {
  waiting: { label: 'WAITING', class: 'text-battle-muted border-battle-muted' },
  active: { label: '⚡ LIVE', class: 'text-battle-neon border-battle-neon animate-pulse' },
  scoring: { label: '🏆 SCORING', class: 'text-battle-gold border-battle-gold' },
  finished: { label: 'FINISHED', class: 'text-battle-muted border-battle-muted' },
}

interface Props {
  room: Room
  isHost: boolean
  isConnected: boolean
  onBack: () => void
}

export function RoomHeader({ room, isHost, isConnected, onBack }: Props) {
  const badge = STATUS_BADGE[room.status] || STATUS_BADGE.waiting
  const shareUrl = `${window.location.origin}/join/${room.code}`

  const copyCode = () => {
    navigator.clipboard.writeText(room.code)
    toast.success('Room code copied!')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    toast.success('Room link copied!')
  }

  return (
    <header className="border-b border-battle-border bg-battle-surface sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="text-battle-muted hover:text-battle-text transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="w-8 h-8 bg-battle-accent rounded-none flex items-center justify-center glow-orange border border-battle-accent">
          <Zap className="w-4 h-4 text-[#520071]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-2xl text-battle-text tracking-wide truncate uppercase mt-1">{room.name}</h1>
            {isHost && (
              <span className="text-xs bg-battle-accent/20 text-battle-accent border border-battle-accent/30 px-2 py-0.5 rounded-none font-mono tracking-widest uppercase">HOST</span>
            )}
            <span className={`text-xs border px-2 py-0.5 rounded-none font-mono tracking-widest uppercase ${badge.class}`}>{badge.label}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Connection indicator */}
          <div className={`flex items-center gap-1.5 text-xs ${isConnected ? 'text-battle-green' : 'text-battle-red'}`}>
            {isConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isConnected ? 'Live' : 'Offline'}</span>
          </div>

          {/* Room code */}
          <button
            onClick={copyCode}
            className="flex items-center gap-2 bg-battle-card border border-battle-border rounded-none px-3 py-1.5 hover:border-battle-neon transition-colors group"
            title="Copy room code"
          >
            <span className="font-mono text-battle-neon text-sm tracking-widest">{room.code}</span>
            <Copy className="w-3.5 h-3.5 text-battle-muted group-hover:text-battle-neon transition-colors" />
          </button>

          <button
            onClick={copyLink}
            className="text-xs text-battle-textDim hover:text-battle-accent transition-colors hidden sm:block"
          >
            Share link
          </button>
        </div>
      </div>
    </header>
  )
}
