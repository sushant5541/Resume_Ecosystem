import React, { useState } from 'react'
import { register } from '../../services/authService'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e){
    e.preventDefault()
    try{ await register(name,email,password); alert('Registered') }catch(e){ alert('Error') }
  }

  return (
    <div className="card">
      <h3>Register</h3>
      <form onSubmit={submit}>
        <div className="form-row"><input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/></div>
        <div className="form-row"><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/></div>
        <div className="form-row"><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/></div>
        <div className="form-row"><button className="btn" type="submit">Register</button></div>
      </form>
    </div>
  )
}
