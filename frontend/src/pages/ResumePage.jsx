import React, { useContext, useEffect, useState } from 'react'
import { ResumeContext } from '../context/ResumeContext'
import { fetchResume, saveResume } from '../services/resumeService'

export default function ResumePage(){
  const { resume, setResume } = useContext(ResumeContext)
  const [email, setEmail] = useState('alice@example.com')
  const [form, setForm] = useState({ headline:'', summary:'', skills:'' })

  useEffect(()=>{
    async function load(){
      try{
        const data = await fetchResume(email)
        setResume(data)
        setForm({ headline: data?.user?.headline || '', summary: data?.summary || '', skills: (data?.skills||[]).join(', ') })
      }catch(e){}
    }
    load()
  }, [])

  async function save(e){
    e.preventDefault()
    if (!form.headline.trim() && !form.summary.trim()) {
      alert('Please provide at least a headline or a summary before saving.')
      return
    }
    const payload = { userEmail: email, headline: form.headline, summary: form.summary, skills: form.skills.split(',').map(s=>s.trim()).filter(Boolean) }
    try{
      const res = await saveResume(payload)
      setResume(res)
      alert('Saved')
    }catch(err){
      alert(err.response?.data?.message || 'Save failed')
    }
  }

return (
    <div className="container">
      <div className="card">
        <h2>Edit Resume</h2>
        <form onSubmit={save}>
          <div className="form-row">
            <input className="input" value={form.headline} onChange={e=>setForm({...form, headline:e.target.value})} placeholder="Headline" />
          </div>
          <div className="form-row">
            <textarea className="input" rows={4} value={form.summary} onChange={e=>setForm({...form, summary:e.target.value})} placeholder="Summary" />
          </div>
          <div className="form-row">
            <input className="input" value={form.skills} onChange={e=>setForm({...form, skills:e.target.value})} placeholder="Skills (comma separated)" />
          </div>
          <div className="form-row">
            <button className="btn" type="submit">Save Resume</button>
          </div>
        </form>
      </div>
    </div>
  )
}
