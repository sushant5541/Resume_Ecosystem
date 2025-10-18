const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// create or update resume for user
router.post('/',
  body('userEmail').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { userEmail, headline, summary, skills = [], projects = [], courses = [] } = req.body;
    let user = await User.findOne({ email: userEmail });
    if (!user) {
      user = await User.create({ name: userEmail.split('@')[0], email: userEmail });
    }
    let resume = await Resume.findOne({ user: user._id });
    if (!resume) {
      resume = new Resume({ user: user._id });
    }
    resume.headline = headline || resume.headline;
    resume.summary = summary || resume.summary;
    resume.skills = skills;
    resume.projects = projects;
    resume.courses = courses;
    resume.updatedAt = new Date();
    await resume.save();
    res.json({ resume });
  }
);

// get resume by user email
router.get('/:email', async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const resume = await Resume.findOne({ user: user._id }).populate('user');
  if (!resume) return res.status(404).json({ message: 'Resume not found' });
  res.json({ resume });
});

module.exports = router;
