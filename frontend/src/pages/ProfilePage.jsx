import React, { useEffect, useState, useContext } from 'react'
import { getProfile, updateProfile, deleteProfile } from '../services/profileService'
import { AuthContext } from '../context/AuthContext'

export default function ProfilePage(){
  const { user, logout } = useContext(AuthContext)
  const [form, setForm] = useState({ name:'', email:'', avatarUrl:'' })
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function load(){
      try{
        const res = await getProfile()
        setForm({ name: res.user.name || '', email: res.user.email || '', avatarUrl: res.user.avatarUrl || '' })
      }catch(e){}
    }
    load()
  }, [])

  async function save(e){
    e.preventDefault(); setLoading(true)
    try{
      const res = await updateProfile(form)
      alert('Profile updated')
    }catch(err){ alert(err.response?.data?.message || 'Update failed') }
    finally{ setLoading(false) }
  }

  async function remove(){
    if (!confirm('Delete your profile and all data? This cannot be undone.')) return
    try{
      await deleteProfile()
      alert('Profile deleted')
      logout()
    }catch(err){ alert(err.response?.data?.message || 'Delete failed') }
  }

  if (!user) return <div className="card">Please login to manage your profile</div>

  return (
    <div className="container">
      <div className="card">
        <h2>My Profile</h2>
        <form onSubmit={save}>
          <div className="form-row"><input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full name" /></div>
          <div className="form-row"><input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" /></div>
          <div className="form-row"><input className="input" value={form.avatarUrl} onChange={e=>setForm({...form, avatarUrl:e.target.value})} placeholder="Avatar URL" /></div>
          <div className="form-row"><button className="btn" type="submit" disabled={loading}>Save</button> <button type="button" className="btn secondary" onClick={remove}>Delete Profile</button></div>
        </form>
      </div>
    </div>
  )
}
