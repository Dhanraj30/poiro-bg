import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('poiro_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('poiro_token')
      localStorage.removeItem('poiro_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── Auth ────────────────────────────────────────────────────────────────────

export const authApi = {
  register: (data: { email: string; password: string; username: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
}

// ─── Rooms ───────────────────────────────────────────────────────────────────

export const roomsApi = {
  create: (data: { name: string; challenge_prompt: string; max_participants?: number }) =>
    api.post('/rooms', data),
  get: (roomId: string) => api.get(`/rooms/${roomId}`),
  join: (room_code: string) => api.post('/rooms/join', { room_code }),
  myRooms: () => api.get('/rooms'),
}

// ─── Rounds ──────────────────────────────────────────────────────────────────

export const roundsApi = {
  start: (roomId: string) => api.post(`/rounds/start?room_id=${roomId}`),
  close: (roundId: string) => api.post(`/rounds/${roundId}/close`),
  submissions: (roundId: string) => api.get(`/rounds/${roundId}/submissions`),
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export const submissionsApi = {
  create: (data: { prompt: string; round_id: string }) =>
    api.post('/submissions', data),
  retry: (submissionId: string) => api.post(`/submissions/${submissionId}/retry`),
  score: (submissionId: string, data: { submission_id: string; score: number; eliminated: boolean; judge_notes?: string }) =>
    api.post(`/submissions/${submissionId}/score`, data),
}
