require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume_ecosystem';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Models
const User = require('./models/User');
const Resume = require('./models/Resume');

// Routes
const resumeRoutes = require('./routes/resume');
app.use('/api/resumes', resumeRoutes);

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);
  socket.on('joinResume', (resumeId) => {
    socket.join(resumeId);
  });
  socket.on('leaveResume', (resumeId) => {
    socket.leave(resumeId);
  });
  socket.on('resumeUpdated', ({ resumeId, diff }) => {
    socket.to(resumeId).emit('resumeUpdated', diff);
  });
});

// start with basic error handling for port-in-use
mongoose.connect(MONGO)
  .then(() => {
    console.log('MongoDB connected');
    const startServer = (port) => {
      server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use.`);
          // try a fallback port
          const fallback = port + 1;
          console.log(`Trying fallback port ${fallback}...`);
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

module.exports = { app, io };
