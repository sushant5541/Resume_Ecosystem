const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: 'User already exists. Please login.' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user = await User.create({ name, email, passwordHash: hash });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.passwordHash || '');
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.me = async (req, res) => {
  if (!req.user || !req.user.email) return res.status(401).json({ message: 'Not authenticated' });
  const user = await User.findOne({ email: req.user.email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};

