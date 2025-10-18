const User = require('../models/User');
const Project = require('../models/Project');
const Course = require('../models/Course');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Hackathon = require('../models/Hackathon');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
  if (!req.user || !req.user.id) return res.status(401).json({ message: 'Not authenticated' });
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: 'Not authenticated' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { name, email, avatarUrl, password } = req.body;
    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'Email already in use' });
      user.email = email;
    }
    if (name) user.name = name;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
    }
    await user.save();
    const out = user.toObject(); delete out.passwordHash;
    res.json({ user: out });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// delete profile and related resume items
exports.deleteProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: 'Not authenticated' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const uid = user._id;
    await Promise.all([
      Project.deleteMany({ user: uid }),
      Course.deleteMany({ user: uid }),
      Experience.deleteMany({ user: uid }),
      Skill.deleteMany({ user: uid }),
      Hackathon.deleteMany({ user: uid }),
    ]);
    await User.deleteOne({ _id: uid });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};
