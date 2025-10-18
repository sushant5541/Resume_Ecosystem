import api from './api'

export async function fetchResume(email) {
  return (await api.get(`/resumes/${email}`)).data
}

export async function saveResume(payload) {
  return (await api.post('/resumes', payload)).data
}

export async function listProjects() {
  return (await api.get('/projects')).data
}

export async function addProject(p) {
  return (await api.post('/projects', p)).data
}
