import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  return (
    <div className="app-header">
      <div className="brand"><strong>Resume Ecosystem</strong></div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/resume">Resume</Link>
        {user ? (
          <>
            <span className="small-muted">{user.name || user.email}</span>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn secondary">Login</Link>
        )}
      </div>
    </div>
  )
}
