import React from 'react'

export default function ResumePreview({ resume }) {
  if (!resume) return <div className="preview empty">No resume loaded</div>
  return (
    <div className="preview">
      <h2>{resume.headline}</h2>
      <p>{resume.summary}</p>
      <h3>Skills</h3>
      <ul>
        {(resume.skills || []).map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <h3>Projects</h3>
      <ul>
        {(resume.projects || []).map((p, i) => <li key={i}><strong>{p.title}</strong> — {p.description}</li>)}
      </ul>
      <h3>Courses</h3>
      <ul>
        {(resume.courses || []).map((c, i) => <li key={i}>{c.title} — {c.provider}</li>)}
      </ul>
    </div>
  )
}
