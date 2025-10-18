import api from './api'

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password })
  if (res.data.token) sessionStorage.setItem('token', res.data.token)
  return res.data
}

export async function register(name, email, password) {
  const res = await api.post('/auth/register', { name, email, password })
  if (res.data.token) sessionStorage.setItem('token', res.data.token)
  return res.data
}

export function logout() { sessionStorage.removeItem('token') }


export function getCurrentUser() {
  try {
    const token = sessionStorage.getItem('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch (e) { return null }
}
