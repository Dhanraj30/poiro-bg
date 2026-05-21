import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { roomsApi } from '@/lib/api'
import { Zap, Loader2 } from 'lucide-react'

export function JoinPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (code) {
      handleJoin(code)
    }
  }, [code])

  const handleJoin = async (roomCode: string) => {
    setJoining(true)
    try {
      const res = await roomsApi.join(roomCode.toUpperCase())
      toast.success('Joined battle room!')
      navigate(`/room/${res.data.room_id}`)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to join room')
      setJoining(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-battle-bg">
      <div className="text-center">
        <div className="w-12 h-12 bg-battle-accent rounded-none flex items-center justify-center glow-orange border border-battle-accent mx-auto mb-6">
          <Zap className="w-7 h-7 text-[#520071]" />
        </div>
        {joining ? (
          <>
            <Loader2 className="w-8 h-8 text-battle-neon animate-spin mx-auto mb-4" />
            <p className="text-battle-textDim">Entering battle room <span className="text-battle-neon font-mono">{code}</span>...</p>
          </>
        ) : error ? (
          <>
            <p className="text-battle-red mb-4">{error}</p>
            <button onClick={() => navigate('/')} className="text-battle-accent hover:underline">
              Back to lobby
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}
