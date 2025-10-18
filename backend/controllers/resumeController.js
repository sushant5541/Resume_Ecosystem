const User = require('../models/User');
const Project = require('../models/Project');
const Course = require('../models/Course');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Hackathon = require('../models/Hackathon');

// keep resume as aggregated document per user
exports.getResume = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  // gather items
  const [projects, courses, experiences, skills, hackathons] = await Promise.all([
    Project.find({ user: user._id }),
    Course.find({ user: user._id }),
    Experience.find({ user: user._id }),
    Skill.find({ user: user._id }),
    Hackathon.find({ user: user._id })
  ]);
  res.json({ user, projects, courses, experiences, skills, hackathons });
};

// Protected save endpoint: when authenticated, use token user; otherwise allow saving by email
exports.saveResume = async (req, res) => {
  const { userEmail, headline, summary, skills = [], projects = [], courses = [] } = req.body;
  let user;
  if (req.user && req.user.email) {
    user = await User.findOne({ email: req.user.email });
  } else if (userEmail) {
    user = await User.findOne({ email: userEmail });
  }
  if (!user) user = await User.create({ name: (userEmail || 'unknown').split('@')[0], email: userEmail || `user_${Date.now()}@local` });

  // Naive: replace arrays - production would do upsert per item with ids
  await Promise.all([
    Project.deleteMany({ user: user._id }),
    Course.deleteMany({ user: user._id }),
    Experience.deleteMany({ user: user._id }),
    Skill.deleteMany({ user: user._id }),
    Hackathon.deleteMany({ user: user._id })
  ]);
  const createdProjects = await Project.insertMany(projects.map(p => ({ ...p, user: user._id })));
  const createdCourses = await Course.insertMany(courses.map(c => ({ ...c, user: user._id })));
  const createdSkills = await Skill.insertMany((skills || []).map(s => ({ name: s, user: user._id })));
  res.json({ user, projects: createdProjects, courses: createdCourses, skills: createdSkills, headline, summary });
};
