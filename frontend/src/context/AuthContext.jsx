import React, { createContext, useState, useEffect } from 'react'
import { getCurrentUser, logout } from '../services/authService'
import api from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = getCurrentUser()
    if (!u) return setUser(null)
    // fetch full user from server
    api.get('/auth/me').then(res => setUser(res.data.user)).catch(()=> setUser(null))
  }, [])

  const doLogout = () => { logout(); setUser(null) }

  // reload user from server (useful after login/impersonation)
  const reloadUser = async () => {
    try {
      const res = await api.get('/auth/me')
      setUser(res.data.user || null)
    } catch (err) {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout: doLogout, reloadUser }}>
      {children}
    </AuthContext.Provider>
  )
}
