const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  level: { type: String, enum: ['Beginner','Intermediate','Advanced'], default: 'Intermediate' }
});

module.exports = mongoose.model('Skill', SkillSchema);
