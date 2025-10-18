require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const { Server } = require('socket.io');

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume_ecosystem';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// simple health
app.get('/health', (req, res) => res.json({ ok: true }));

// route mounts
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/project');
const courseRoutes = require('./routes/course');
const hackathonRoutes = require('./routes/hackathon');
const skillRoutes = require('./routes/skill');
const profileRoutes = require('./routes/profile');

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/profile', profileRoutes);


// start
mongoose.connect(MONGO)
  .then(() => {
    console.log('MongoDB connected');
    const startServer = (port) => {
      // create fresh server and io for each attempt so we don't call listen twice on the same server
      const server = http.createServer(app);
      const io = new Server(server, { cors: { origin: '*' } });

      // socket handlers
      io.on('connection', (socket) => {
        console.log('socket connected:', socket.id);
        socket.on('joinResume', (resumeId) => socket.join(resumeId));
        socket.on('leaveResume', (resumeId) => socket.leave(resumeId));
        socket.on('resumeUpdated', ({ resumeId, diff }) => socket.to(resumeId).emit('resumeUpdated', diff));
      });

      server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use.`);
          const fallback = port + 1;
          console.log(`Trying fallback port ${fallback}...`);
          // give the OS a short moment before retrying
          setTimeout(() => startServer(fallback), 200);
        } else {
          console.error('Server error:', err);
          process.exit(1);
        }
      });
    };

    startServer(Number(PORT));
  })
  .catch(err => console.error(err));

module.exports = { app };
