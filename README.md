# MERN Resume Service - Trial Task

This project is a focused implementation of a resume management component for a larger connected ecosystem. It provides:
- User registration and JWT authentication
- Resume CRUD (create/update/fetch)
- Auto-generation of a professional resume summary based on profile data
- Real-time updates via Socket.IO so that edits update connected clients immediately
- React frontend with an editor and live resume preview

Folder structure
- backend/ — Express API server (Node.js, Mongoose)
- frontend/ — React app

Getting started (local)

Prerequisites:
# Resume Ecosystem — MERN Demo

This workspace contains a minimal MERN (MongoDB, Express, React, Node) demo for the Resume Ecosystem project described in the trial task.

Goal
-- Provide a core component of the ecosystem: resume storage, editing, and real-time updates so that activities from other platforms could update a student's resume automatically.

What this demo includes
- Backend: Express + Mongoose, models for User and Resume, a REST endpoint to create/update and fetch resumes, Socket.IO hooks for realtime updates, and a seed script.
- Frontend: Vite + React app with a simple ResumeEditor and ResumePreview. It uses REST to save and fetch the resume and Socket.IO client to receive live updates.

Quick start (Windows PowerShell)

Prerequisites:
- Node.js (16+ recommended)
- MongoDB (local or cloud URI)

1) Start backend

```powershell
cd backend
npm install
# Copy .env.example to .env and edit if needed (MONGODB_URI, PORT)
copy .env.example .env
npm run seed    # optional: creates a sample user/resume
npm run dev
```

By default the backend listens on http://localhost:4000

2) Start frontend (new terminal)

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL (usually http://localhost:5173). The frontend expects the backend at http://localhost:4000 by default.

How to use the demo
- The editor saves a resume for the sample email `alice@example.com`. Change the email in `src/App.jsx` if you want to test other addresses.
- The frontend emits Socket.IO events so that multiple open windows will see live updates.

Next steps you could implement
- Add authentication and per-user access control
- Richer editors for projects, courses, and achievements
- Integrate with external platforms to auto-update resume entries
- Add an AI summary generator service

Files of interest
- `backend/src` — Express server, Mongoose models, routes, seed script
- `frontend/src` — React components: `ResumeEditor`, `ResumePreview`, and Socket.IO wiring

If you want, I can now:
- Add JWT authentication and protected routes
- Add more detailed project/course forms and tests
- Implement an AI-based summary generator using a local mock or an API

Enjoy!
