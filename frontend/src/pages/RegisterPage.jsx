import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { register } from '../services/authService'
import { AuthContext } from '../context/AuthContext'

export default function RegisterPage(){
  const { setUser } = useContext(AuthContext)
  const location = useLocation()
  const preEmail = location.state?.email || ''
  const [name, setName] = useState('')
  const [email, setEmail] = useState(preEmail)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function submit(e){
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError('Name is required')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError('Valid email required')
    if (password.length < 6) return setError('Password must be at least 6 characters')
    try{
      const res = await register(name,email,password)
      setUser(res.user)
      alert('Registered and logged in')
    }catch(err){
      const status = err.response?.status
      const msg = err.response?.data?.message
      if (status === 409) {
        // duplicate email
        alert('email is already existed')
        setError(msg || 'Email already exists')
      } else {
        setError(msg || 'Registration failed')
      }
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <div className="form-row"><input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" /></div>
          <div className="form-row"><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" /></div>
          <div className="form-row"><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" /></div>
          <div className="form-row"><button className="btn" type="submit">Register</button></div>
          {error && <div className="text-muted">{error}</div>}
        </form>
      </div>
    </div>
  )
}
