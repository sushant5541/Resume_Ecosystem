import React from 'react'
import ResumePreview from '../components/Resume/ResumePreview'

export default function DashboardPage(){
  return (
    <div className="container layout">
      <div className="sidebar card">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button className="btn">Import from Hackathon</button>
          <button className="btn secondary">Sync Learning</button>
        </div>
      </div>
      <div className="content">
        <div className="card">
          <h3>Live Resume Preview</h3>
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
