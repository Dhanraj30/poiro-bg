import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Zap, Loader2 } from 'lucide-react'

export function RegisterPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.register(form)
      setAuth(res.data.user, res.data.access_token)
      toast.success('Registration successful!')
      navigate('/lobby')
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-battle-bg px-4 relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-battle-bg/80">
          <Loader2 className="w-10 h-10 text-battle-neon animate-spin mb-4" />
          <p className="text-battle-textDim font-mono text-sm">Creating your fighter...</p>
        </div>
      )}
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-battle-accent flex items-center justify-center glow-orange border border-battle-accent">
              <Zap className="w-7 h-7 text-[#520071]" />
            </div>
            <h1 className="font-display text-5xl text-battle-text tracking-wider uppercase">POIRO</h1>
          </div>
          <p className="text-battle-textDim text-sm">AI Creative Battle Platform</p>
        </div>

        <div className="battle-card p-8">
          <h2 className="font-display text-2xl text-battle-text mb-6 tracking-wide">CREATE YOUR FIGHTER</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-battle-textDim mb-1.5 uppercase tracking-wider">Battle Name</label>
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-battle-surface/50 border border-battle-border rounded-none px-4 py-3 text-battle-text font-mono placeholder-battle-muted focus:outline-none focus:border-battle-accent focus:shadow-[0_0_15px_rgba(236,178,255,0.2)] transition-all"
                placeholder="CyberWarlord99"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-battle-textDim mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-battle-surface/50 border border-battle-border rounded-none px-4 py-3 text-battle-text font-mono placeholder-battle-muted focus:outline-none focus:border-battle-accent focus:shadow-[0_0_15px_rgba(236,178,255,0.2)] transition-all"
                placeholder="fighter@arena.io"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-battle-textDim mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-battle-surface/50 border border-battle-border rounded-none px-4 py-3 text-battle-text font-mono placeholder-battle-muted focus:outline-none focus:border-battle-accent focus:shadow-[0_0_15px_rgba(236,178,255,0.2)] transition-all"
                placeholder="Min 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-battle-accent hover:bg-battle-accentHover disabled:opacity-50 disabled:cursor-not-allowed text-[#520071] font-display font-bold py-3 rounded-none transition-all duration-200 glow-orange mt-4 tracking-widest text-lg uppercase"
            >
              {loading ? 'Creating fighter...' : 'Join the Battle'}
            </button>
          </form>

          <p className="text-center text-battle-textDim text-sm mt-6">
            Already fighting?{' '}
            <Link to="/login" className="text-battle-accent hover:text-battle-accentHover transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
