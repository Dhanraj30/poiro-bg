import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Zap } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.login(form)
      setAuth(res.data.user, res.data.access_token)
      toast.success('Welcome back, fighter!')
      navigate('/')
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-battle-bg px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-battle-accent rounded-lg flex items-center justify-center glow-orange">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-display text-5xl text-battle-text tracking-wider">POIRO</h1>
          </div>
          <p className="text-battle-textDim text-sm">AI Creative Battle Platform</p>
        </div>

        <div className="battle-card p-8">
          <h2 className="font-display text-2xl text-battle-text mb-6 tracking-wide">ENTER THE ARENA</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-battle-textDim mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-battle-surface border border-battle-border rounded-lg px-4 py-3 text-battle-text placeholder-battle-muted focus:outline-none focus:border-battle-accent transition-colors"
                placeholder="fighter@arena.io"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-battle-textDim mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-battle-surface border border-battle-border rounded-lg px-4 py-3 text-battle-text placeholder-battle-muted focus:outline-none focus:border-battle-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-battle-accent hover:bg-battle-accentHover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 glow-orange mt-2"
            >
              {loading ? 'Entering...' : 'Enter Battle'}
            </button>
          </form>

          <p className="text-center text-battle-textDim text-sm mt-6">
            New fighter?{' '}
            <Link to="/register" className="text-battle-accent hover:text-battle-accentHover transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
