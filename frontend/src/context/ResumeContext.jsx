import React, { createContext, useState } from 'react'

export const ResumeContext = createContext()

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(null)
  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  )
}
