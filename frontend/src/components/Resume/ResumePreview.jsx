import React, { useContext, useEffect, useState } from 'react'
import { ResumeContext } from '../../context/ResumeContext'
import { fetchResume } from '../../services/resumeService'
import io from 'socket.io-client'

const SOCKET = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000'
const socket = io(SOCKET)

export default function ResumePreview({ email='alice@example.com' }){
  const { resume, setResume } = useContext(ResumeContext)
  const [local, setLocal] = useState(resume)

  useEffect(()=>{
    async function load(){
      try{ const data = await fetchResume(email); setResume(data); setLocal(data) }catch(e){}
    }
    load()
  }, [])

  useEffect(()=>{
    socket.emit('joinResume', email)
    socket.on('resumeUpdated', (diff)=>{
      setLocal(prev => ({ ...(prev||{}), ...diff }))
    })
    return ()=>{ socket.emit('leaveResume', email); socket.off('resumeUpdated') }
  }, [email])

  const r = local || resume
  if (!r) return <div className="text-muted">No resume data</div>
  return (
    <div className="resume-preview">
      <h2>{r.user?.name || r.headline || 'Unnamed'}</h2>
      {r.headline && <div className="small">{r.headline}</div>}
      {r.summary && <p>{r.summary}</p>}
      <div className="section-title">Skills</div>
      <div>{(r.skills||[]).join(', ')}</div>
      <div className="section-title">Projects</div>
      <ul>
        {(r.projects||[]).map((p,i)=>(<li key={i}><strong>{p.title}</strong> — {p.description}</li>))}
      </ul>
    </div>
  )
}
