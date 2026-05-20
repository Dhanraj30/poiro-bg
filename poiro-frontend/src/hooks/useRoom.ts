import { useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getSocket, joinRoomSocket, leaveRoomSocket } from '@/lib/socket'
import { useRoomStore } from '@/store/roomStore'
import { roomsApi } from '@/lib/api'

export function useRoom(roomId: string | undefined) {
  const store = useRoomStore()

  const fetchRoom = useCallback(async () => {
    if (!roomId) return
    try {
      const res = await roomsApi.get(roomId)
      store.setRoom(res.data)
    } catch (err) {
      toast.error('Failed to load room')
    }
  }, [roomId])

  useEffect(() => {
    if (!roomId) return
    fetchRoom()

    const socket = getSocket()
    joinRoomSocket(roomId)
    store.setConnected(socket.connected)

    const onConnect = () => store.setConnected(true)
    const onDisconnect = () => store.setConnected(false)

    // ── Socket event handlers ──────────────────────────────────────

    const onRoomUpdate = (data: any) => {
      if (data.status) store.updateRoomStatus(data.status)
      if (data.event === 'participant_joined') {
        toast(`🎮 ${data.username} joined the battle!`, { icon: '⚡' })
        fetchRoom() // refetch participants list
      } else if (data.event === 'submission_created' && data.submission) {
        store.addSubmission(data.submission)
      }
    }

    const onRoundUpdate = (data: any) => {
      if (data.event === 'round_started') {
        store.setActiveRound(data)
        toast.success(`⚔️ Round ${data.round_number} has started!`, { duration: 4000 })
      } else if (data.event === 'round_closed') {
        store.updateRound({ id: data.id, status: 'closed' })
        store.updateRoomStatus('scoring')
        toast(`🔒 Round ${data.round_number} closed — scoring begins!`, { icon: '🏆' })
      }
    }

    const onJobUpdate = (data: any) => {
      store.updateSubmission(data.submission_id, {
        status: data.status,
        generated_output: data.output ?? undefined,
        error_message: data.error ?? undefined,
      })

      if (data.status === 'completed') {
        toast.success('✨ AI generation complete!', { duration: 3000 })
      } else if (data.status === 'failed' || data.status === 'timed_out') {
        toast.error(`Generation ${data.status}. You can retry.`)
      }
    }

    const onScoreUpdate = (data: any) => {
      store.updateSubmission(data.submission_id, {
        score: data.score,
        eliminated: data.eliminated,
        judge_notes: data.judge_notes,
      })

      if (data.eliminated) {
        toast(`💀 ${data.username} has been eliminated!`, { icon: '☠️', duration: 4000 })
      } else {
        toast(`🏆 ${data.username} scored ${data.score}/100`, { icon: '⭐', duration: 3000 })
      }
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('room_update', onRoomUpdate)
    socket.on('round_update', onRoundUpdate)
    socket.on('job_update', onJobUpdate)
    socket.on('score_update', onScoreUpdate)

    return () => {
      leaveRoomSocket(roomId)
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('room_update', onRoomUpdate)
      socket.off('round_update', onRoundUpdate)
      socket.off('job_update', onJobUpdate)
      socket.off('score_update', onScoreUpdate)
    }
  }, [roomId])

  return { room: store.room, isConnected: store.isConnected, fetchRoom }
}
