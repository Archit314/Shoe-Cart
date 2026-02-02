import axios from 'axios'

const api = axios.create({
  baseURL: '/v1/api/user',
  withCredentials: true
})

export const signUp = (payload) => api.post('/sign-up', payload)
export const signIn = (payload) => api.post('/sign-in', payload)

export default api
