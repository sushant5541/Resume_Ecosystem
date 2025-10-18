import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage(){
  return (
    <div className="container">
      <div className="card">
        <h2>Resume Ecosystem Demo</h2>
        <p className="text-muted">A small demo integrating multiple activity sources to update professional resumes.</p>
        <div className="quick-actions">
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
          <Link to="/resume" className="btn secondary">Open Resume</Link>
        </div>
      </div>
    </div>
  )
}
