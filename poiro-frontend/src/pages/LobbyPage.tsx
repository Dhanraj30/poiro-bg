import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { roomsApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Room } from '@/types'
import { Plus, LogOut, Zap, Users, Clock, ChevronRight, Copy } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const STATUS_COLORS: Record<string, string> = {
  waiting: 'text-battle-textDim border-battle-border',
  active: 'text-battle-neon border-battle-neon',
  scoring: 'text-battle-gold border-battle-gold',
  finished: 'text-battle-muted border-battle-muted',
}

export function LobbyPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [rooms, setRooms] = useState<Room[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [joinCode, setJoinCode] = useState('')
  const [form, setForm] = useState({ name: '', challenge_prompt: '', max_participants: 8 })
  const [creating, setCreating] = useState(false)
  const [joining, setJoining] = useState(false)

  useEffect(() => {
    roomsApi.myRooms().then((res) => {
      setRooms(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.challenge_prompt.trim()) return
    setCreating(true)
    try {
      const res = await roomsApi.create(form)
      toast.success('Battle room created!')
      navigate(`/room/${res.data.id}`)
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to create room')
    } finally {
      setCreating(false)
    }
  }

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!joinCode.trim()) return
    setJoining(true)
    try {
      const res = await roomsApi.join(joinCode.trim().toUpperCase())
      toast.success('Joined battle room!')
      navigate(`/room/${res.data.room_id}`)
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to join room')
    } finally {
      setJoining(false)
    }
  }

  return (
    <div className="min-h-screen bg-battle-bg">
      {/* Header */}
      <header className="border-b border-battle-border bg-battle-surface">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-battle-accent rounded-lg flex items-center justify-center glow-orange">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-3xl text-battle-text tracking-wider">POIRO</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-battle-textDim text-sm">
              <span className="text-battle-neon font-mono">{user?.username}</span>
            </span>
            <button
              onClick={() => { logout(); navigate('/login') }}
              className="text-battle-muted hover:text-battle-text transition-colors p-2"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column: actions */}
          <div className="lg:col-span-1 space-y-6">

            {/* Create Room */}
            <div className="battle-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-battle-text tracking-wide">NEW BATTLE ROOM</h2>
                <button onClick={() => setShowCreate(!showCreate)} className="text-battle-accent hover:text-battle-accentHover">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {showCreate && (
                <form onSubmit={handleCreate} className="space-y-4 animate-slide-up">
                  <div>
                    <label className="block text-xs font-medium text-battle-textDim mb-1.5 uppercase tracking-wider">Room Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-battle-surface border border-battle-border rounded-lg px-3 py-2.5 text-battle-text text-sm placeholder-battle-muted focus:outline-none focus:border-battle-accent transition-colors"
                      placeholder="Creative Chaos #1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-battle-textDim mb-1.5 uppercase tracking-wider">Challenge Prompt</label>
                    <textarea
                      required
                      rows={3}
                      value={form.challenge_prompt}
                      onChange={(e) => setForm({ ...form, challenge_prompt: e.target.value })}
                      className="w-full bg-battle-surface border border-battle-border rounded-lg px-3 py-2.5 text-battle-text text-sm placeholder-battle-muted focus:outline-none focus:border-battle-accent transition-colors resize-none"
                      placeholder="Create the most insane luxury cyberpunk perfume campaign for Gen-Z..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-battle-textDim mb-1.5 uppercase tracking-wider">Max Fighters</label>
                    <input
                      type="number"
                      min={2}
                      max={20}
                      value={form.max_participants}
                      onChange={(e) => setForm({ ...form, max_participants: parseInt(e.target.value) })}
                      className="w-full bg-battle-surface border border-battle-border rounded-lg px-3 py-2.5 text-battle-text text-sm focus:outline-none focus:border-battle-accent transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full bg-battle-accent hover:bg-battle-accentHover disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-all text-sm"
                  >
                    {creating ? 'Creating...' : '⚔️ Launch Battle Room'}
                  </button>
                </form>
              )}

              {!showCreate && (
                <p className="text-battle-textDim text-sm">Host a creative AI battle and judge submissions in real-time.</p>
              )}
            </div>

            {/* Join Room */}
            <div className="battle-card p-6">
              <h2 className="font-display text-xl text-battle-text tracking-wide mb-4">JOIN A ROOM</h2>
              <form onSubmit={handleJoin} className="space-y-3">
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  maxLength={8}
                  className="w-full bg-battle-surface border border-battle-border rounded-lg px-3 py-2.5 text-battle-text font-mono text-center text-lg tracking-widest placeholder-battle-muted focus:outline-none focus:border-battle-neon transition-colors"
                  placeholder="ROOM CODE"
                />
                <button
                  type="submit"
                  disabled={joining || !joinCode.trim()}
                  className="w-full bg-battle-neonDim hover:bg-battle-neon/30 border border-battle-neon text-battle-neon disabled:opacity-50 font-semibold py-2.5 rounded-lg transition-all text-sm"
                >
                  {joining ? 'Joining...' : '🎮 Enter Room'}
                </button>
              </form>
            </div>
          </div>

          {/* Right column: rooms list */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl text-battle-text tracking-wide mb-6">YOUR BATTLE ROOMS</h2>

            {loading && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="battle-card p-5 animate-pulse">
                    <div className="h-4 bg-battle-border rounded w-1/3 mb-3" />
                    <div className="h-3 bg-battle-border rounded w-2/3" />
                  </div>
                ))}
              </div>
            )}

            {!loading && rooms.length === 0 && (
              <div className="battle-card p-12 text-center">
                <div className="text-4xl mb-4">⚔️</div>
                <p className="text-battle-textDim">No battle rooms yet. Create one to start fighting!</p>
              </div>
            )}

            <div className="space-y-3">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => navigate(`/room/${room.id}`)}
                  className="w-full battle-card p-5 hover:border-battle-accent transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-battle-text group-hover:text-battle-accent transition-colors">{room.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono border px-2 py-0.5 rounded uppercase ${STATUS_COLORS[room.status] || 'text-battle-muted border-battle-muted'}`}>
                        {room.status}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(room.code); toast.success('Code copied!') }}
                        className="text-battle-muted hover:text-battle-neon transition-colors"
                        title="Copy room code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-battle-muted group-hover:text-battle-accent transition-colors" />
                    </div>
                  </div>
                  <p className="text-battle-textDim text-sm line-clamp-1 mb-3">{room.challenge_prompt}</p>
                  <div className="flex items-center gap-4 text-xs text-battle-muted">
                    <span className="font-mono bg-battle-border px-2 py-0.5 rounded text-battle-neon">{room.code}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {room.max_participants} max</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDistanceToNow(new Date(room.created_at), { addSuffix: true })}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
