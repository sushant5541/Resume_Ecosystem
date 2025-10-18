import api from './api'

export async function getProfile() {
  return (await api.get('/profile')).data
}

export async function updateProfile(payload) {
  return (await api.put('/profile', payload)).data
}

export async function deleteProfile() {
  return (await api.delete('/profile')).data
}
