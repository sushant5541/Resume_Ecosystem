import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// styles are imported via index.css
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'
import Navbar from './components/Layout/Navbar'
import Sidebar from './components/Layout/Sidebar'
import Footer from './components/Layout/Footer'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import ResumePage from './pages/ResumePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import './index.css'; 

export default function App(){
  return (
    <AuthProvider>
      <ResumeProvider>
        <BrowserRouter>
          <div className="app-root">
            <Navbar />
            <div className="container layout">
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/dashboard" element={<DashboardPage/>} />
                  <Route path="/resume" element={<ResumePage/>} />
                  <Route path="/profile" element={<ProfilePage/>} />
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="/register" element={<RegisterPage/>} />
                </Routes>
              </div>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </ResumeProvider>
    </AuthProvider>
  )
}
