import React from 'react'

export default function Footer(){
  return (
    <footer className="app-footer">
      <div className="container footer-inner">
        <div className="footer-left">Resume Ecosystem — Demo project</div>
        <div className="footer-center">Built with React, Express & MongoDB</div>
        <div className="footer-right">© {new Date().getFullYear()} Resume Ecosystem</div>
      </div>
    </footer>
  )
}
