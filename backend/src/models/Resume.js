const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  skills: [String],
  startDate: Date,
  endDate: Date,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  provider: String,
  completedAt: Date,
  url: String,
});

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  headline: { type: String },
  summary: { type: String },
  skills: [String],
  projects: [ProjectSchema],
  courses: [CourseSchema],
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
