import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function ResumeEditor({ email, setResume, resume, socket }) {
  const [form, setForm] = useState({ headline: '', summary: '', skills: '' })

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await axios.get(`${API}/resumes/${email}`)
        setResume(res.data.resume)
        setForm({ headline: res.data.resume.headline || '', summary: res.data.resume.summary || '', skills: (res.data.resume.skills || []).join(', ') })
      } catch (err) {
        // not found
      }
    }
    fetchResume()
  }, [email])

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function save(e) {
    e.preventDefault()
    if (!form.headline.trim() && !form.summary.trim()) {
      alert('Please provide a headline or a summary before saving')
      return
    }
    const skillsArr = form.skills.split(',').map(s => s.trim()).filter(Boolean)
    const payload = {
      userEmail: email,
      headline: form.headline,
      summary: form.summary,
      skills: skillsArr
    }
    const res = await axios.post(`${API}/resumes`, payload)
    setResume(res.data.resume)
    socket.emit('resumeUpdated', { resumeId: email, diff: payload })
  }

  return (
    <form className="editor" onSubmit={save}>
      <label>Headline</label>
      <input name="headline" value={form.headline} onChange={onChange} />
      <label>Summary</label>
      <textarea name="summary" value={form.summary} onChange={onChange} />
      <label>Skills (comma separated)</label>
      <input name="skills" value={form.skills} onChange={onChange} />
      <button type="submit">Save</button>
    </form>
  )
}
