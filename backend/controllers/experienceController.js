const Experience = require('../models/Experience');

exports.addExperience = async (req, res) => {
  const data = req.body;
  if (!data.title && !data.company) return res.status(400).json({ message: 'Experience title or company is required' });
  try{
    const exp = await Experience.create(data);
    res.json(exp);
  }catch(err){
    res.status(500).json({ message: 'Failed to create experience', error: err.message })
  }
};

exports.list = async (req, res) => {
  const items = await Experience.find({});
  res.json(items);
};
