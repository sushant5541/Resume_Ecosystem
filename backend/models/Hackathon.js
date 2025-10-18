const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  role: String,
  year: Number,
  prize: String,
  projectLink: String
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
