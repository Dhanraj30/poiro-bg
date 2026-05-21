import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { roomsApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Room } from '@/types'

const STATUS_COLORS: Record<string, string> = {
  waiting: 'text-outline border-outline-variant/30',
  active: 'text-secondary border-secondary/30',
  scoring: 'text-tertiary border-tertiary/30',
  finished: 'text-outline border-outline-variant/30',
}

export function LobbyPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [rooms, setRooms] = useState<Room[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
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
    <div className="bg-background font-body-md text-on-background selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
      <header className="fixed top-0 w-full flex justify-between items-center px-margin-desktop h-16 bg-background/80 backdrop-blur-xl z-50 border-b border-outline-variant/30 shadow-[0_0_20px_rgba(236,186,255,0.15)]">
        <div className="flex items-center gap-8">
          <span className="font-display-lg text-headline-lg font-black tracking-tighter text-primary italic uppercase mt-1">POIRO</span>
          <nav className="hidden md:flex gap-6">
            <Link to="/lobby" className="font-label-technical text-label-technical uppercase tracking-widest text-primary border-b-2 border-primary pb-1 transition-all duration-200 active:scale-95">Lobby</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-label-technical text-label-sm text-secondary uppercase hidden md:inline-block">
            {user?.username}
          </span>
          <button onClick={() => { logout(); navigate('/') }} className="bg-primary/20 text-primary border border-primary/50 px-4 py-1.5 font-label-technical text-label-sm uppercase font-bold tech-corner transition-all hover:bg-primary hover:text-on-primary active:scale-95">Disconnect</button>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] bg-surface-container-lowest/90 backdrop-blur-2xl border-r border-outline-variant/20 w-64 z-40">
          <div className="p-6 border-b border-outline-variant/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 border border-primary/40 flex items-center justify-center tech-corner overflow-hidden">
                <span className="material-symbols-outlined text-primary">person</span>
              </div>
              <div>
                <h3 className="font-label-technical text-primary text-label-sm leading-tight uppercase">{user?.username}</h3>
                <p className="font-label-technical text-outline text-[10px] tracking-widest">RANK: PHANTOM</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="px-3 mb-2">
              <button className="w-full py-3 bg-secondary/10 text-secondary border-r-4 border-secondary flex items-center gap-3 px-4 transition-transform duration-300 ease-in-out hover:glow-secondary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
                <span className="font-label-technical text-label-sm uppercase tracking-wider">Live Battles</span>
              </button>
            </div>
          </nav>
          <div className="mt-auto p-4 border-t border-outline-variant/10">
            <button onClick={() => { setShowCreate(true); setShowJoin(false); }} className="w-full py-3 border border-secondary text-secondary font-label-technical text-label-sm uppercase tracking-widest tech-corner hover:bg-secondary/10 transition-colors mb-4">
                NEW BATTLE
            </button>
            <button onClick={() => { setShowJoin(true); setShowCreate(false); }} className="w-full py-3 border border-primary text-primary font-label-technical text-label-sm uppercase tracking-widest tech-corner hover:bg-primary/10 transition-colors mb-4">
                JOIN BATTLE
            </button>
          </div>
        </aside>

        <main className="flex-1 lg:ml-64 p-6 md:p-10 min-h-screen">
          <div className="max-w-container-max mx-auto">
            
            {showCreate && (
              <div className="mb-10 p-6 glass-panel border border-secondary/50 animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-headline-lg text-secondary uppercase tracking-widest">INITIALIZE BATTLE INSTANCE</h2>
                  <button onClick={() => setShowCreate(false)} className="text-outline hover:text-secondary"><span className="material-symbols-outlined">close</span></button>
                </div>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="block font-label-technical text-[10px] uppercase text-outline mb-1">Instance Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-surface-container border border-outline-variant/50 text-on-surface font-label-technical text-sm px-4 py-3 focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(0,238,252,0.2)] transition-all tech-corner" placeholder="NEURAL_CLASH_01" />
                  </div>
                  <div>
                    <label className="block font-label-technical text-[10px] uppercase text-outline mb-1">Challenge Parameters</label>
                    <textarea required rows={3} value={form.challenge_prompt} onChange={e => setForm({...form, challenge_prompt: e.target.value})} className="w-full bg-surface-container border border-outline-variant/50 text-on-surface font-label-technical text-sm px-4 py-3 focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(0,238,252,0.2)] transition-all tech-corner resize-none" placeholder="Generate a high-contrast cyberpunk cityscape..."></textarea>
                  </div>
                  <div>
                    <label className="block font-label-technical text-[10px] uppercase text-outline mb-1">Max Operators</label>
                    <input type="number" min="2" max="20" value={form.max_participants} onChange={e => setForm({...form, max_participants: parseInt(e.target.value)})} className="w-full bg-surface-container border border-outline-variant/50 text-on-surface font-label-technical text-sm px-4 py-3 focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_rgba(0,238,252,0.2)] transition-all tech-corner" />
                  </div>
                  <button type="submit" disabled={creating} className="w-full bg-secondary text-on-secondary font-label-technical font-bold uppercase tracking-widest py-4 mt-4 hover:glow-secondary tech-corner transition-all active:scale-95 disabled:opacity-50">
                    {creating ? 'INITIALIZING...' : 'LAUNCH INSTANCE'}
                  </button>
                </form>
              </div>
            )}

            {showJoin && (
              <div className="mb-10 p-6 glass-panel border border-primary/50 animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-headline-lg text-primary uppercase tracking-widest">CONNECT TO INSTANCE</h2>
                  <button onClick={() => setShowJoin(false)} className="text-outline hover:text-primary"><span className="material-symbols-outlined">close</span></button>
                </div>
                <form onSubmit={handleJoin} className="space-y-4">
                  <div>
                    <label className="block font-label-technical text-[10px] uppercase text-outline mb-1">Access Code</label>
                    <input type="text" required value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} maxLength={8} className="w-full bg-surface-container border border-outline-variant/50 text-on-surface font-headline-lg text-center tracking-[0.5em] px-4 py-4 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(236,186,255,0.2)] transition-all tech-corner" placeholder="CODE" />
                  </div>
                  <button type="submit" disabled={joining || !joinCode.trim()} className="w-full bg-primary text-on-primary font-label-technical font-bold uppercase tracking-widest py-4 mt-4 hover:glow-primary tech-corner transition-all active:scale-95 disabled:opacity-50">
                    {joining ? 'CONNECTING...' : 'ESTABLISH LINK'}
                  </button>
                </form>
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight uppercase">ACTIVE_LOBBY</h1>
                <p className="font-label-technical text-on-surface-variant text-label-sm opacity-60 uppercase">SCANNING FOR YOUR INSTANCES...</p>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="glass-panel p-6 animate-pulse border border-outline-variant/10">
                    <div className="h-4 bg-outline-variant/20 w-1/3 mb-4"></div>
                    <div className="h-3 bg-outline-variant/10 w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : rooms.length === 0 ? (
              <div className="glass-panel p-12 text-center border border-outline-variant/20 border-dashed">
                <span className="material-symbols-outlined text-4xl text-outline mb-4">warning</span>
                <p className="font-label-technical text-outline uppercase tracking-widest">No Active Instances Found. Create or Join a Battle.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {rooms.map(room => (
                  <div key={room.id} onClick={() => navigate(`/room/${room.id}`)} className="glass-panel relative overflow-hidden group hover:border-primary/50 hover:glow-primary transition-all duration-300 cursor-pointer p-6 flex flex-col justify-between min-h-[220px]">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-surface-variant text-on-surface-variant font-label-technical text-[10px] border-l border-b border-outline-variant/30 uppercase group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/50 transition-colors">
                      {room.status}
                    </div>
                    
                    <div>
                      <p className="font-label-technical text-[10px] text-outline mb-2 uppercase tracking-widest flex items-center gap-2">CODE: <span className="text-primary hover:text-primary/80 transition-colors cursor-copy" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(room.code); toast.success('Code copied!'); }}>{room.code}</span></p>
                      <h2 className="font-headline-lg text-headline-lg text-on-surface leading-none uppercase mb-2 group-hover:text-primary transition-colors">{room.name}</h2>
                      <p className="font-body-md text-on-surface-variant text-sm line-clamp-2">{room.challenge_prompt}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-outline-variant/20 pt-4">
                      <div className="flex flex-col">
                        <span className="text-outline font-label-technical text-[10px] uppercase mb-1">Capacity</span>
                        <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-[16px] text-secondary">group</span>
                           <span className="font-label-technical text-label-sm text-secondary">Max {room.max_participants}</span>
                        </div>
                      </div>
                      <button className="bg-primary/10 border border-primary/30 text-primary px-6 py-2 font-label-technical text-label-sm uppercase tech-corner group-hover:bg-primary group-hover:text-on-primary transition-all">ENTER</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
