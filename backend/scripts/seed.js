require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const Course = require('../models/Course');
const Skill = require('../models/Skill');

const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume_ecosystem';

async function seed() {
  await mongoose.connect(MONGO);
  await User.deleteMany({});
  await Project.deleteMany({});
  await Course.deleteMany({});
  await Skill.deleteMany({});

  const u = await User.create({ name: 'Alice Example', email: 'alice@example.com' });
  await Project.create({ title: 'Portfolio', description: 'Personal site', link: 'https://example.com', skills: ['React','Node'], user: u._id });
  await Course.create({ title: 'Algorithms', provider: 'University', completedAt: new Date(), url: '', user: u._id});
  await Skill.create({ name: 'JavaScript', user: u._id });

  console.log('Seeded sample data');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
