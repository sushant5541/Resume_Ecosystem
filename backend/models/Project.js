const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  link: String,
  skills: [String]
});

module.exports = mongoose.model('Project', ProjectSchema);
