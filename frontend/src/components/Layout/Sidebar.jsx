import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Sidebar(){
  const { user } = useContext(AuthContext)
  return (
    <div className="sidebar card">
      <h4>Menu</h4>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/resume">Resume</Link></li>
        {user && <li><Link to="/profile">My Profile</Link></li>}
      </ul>
    </div>
  )
}
