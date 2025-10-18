const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  provider: String,
  completedAt: Date,
  url: String
});

module.exports = mongoose.model('Course', CourseSchema);
