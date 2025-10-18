const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  company: String,
  startDate: Date,
  endDate: Date,
  description: String
});

module.exports = mongoose.model('Experience', ExperienceSchema);
