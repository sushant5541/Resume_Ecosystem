import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../services/authService'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { setUser } = useContext(AuthContext)
  const [email, setEmail] = useState('alice@example.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setError(null)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError('Please enter a valid email')
    if (!password) return setError('Password is required')
    setLoading(true)
    try {
      const res = await login(email, password)
      setUser(res.user || null)
      // on success redirect to home
      navigate('/')
    } catch (err) {
      const status = err.response?.status
      if (status === 404) {
        alert('you have to register first')
        // redirect to register with email prefilled
        navigate('/register', { state: { email } })
        return
      }
      setError(err.response?.data?.message || err.message)
    } finally { setLoading(false) }
  }

  const navigate = useNavigate()

  const { reloadUser } = useContext(AuthContext)

  return (
    <div className="login-panel card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="form-row"><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" /></div>
        <div className="form-row"><input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" /></div>
        <div className="form-row">
          <button className="btn" type="submit" disabled={loading}>{loading? 'Signing in...' : 'Sign in'}</button>
          
          <Link to="/register" className="btn secondary" style={{ marginLeft: '8px' }}>Register</Link>
        </div>
        {error && <div className="text-muted">{error}</div>}
      </form>
    </div>
  )
}
