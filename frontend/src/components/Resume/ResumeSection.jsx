import React from 'react'

export default function ResumeSection({ title, children }){
  return (
    <div className="card">
      <h4 className="section-title">{title}</h4>
      <div>{children}</div>
    </div>
  )
}
