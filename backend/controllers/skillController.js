const Skill = require('../models/Skill');

exports.addSkill = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.name.trim()) return res.status(400).json({ message: 'Skill name is required' });
  try{
    const p = await Skill.create(data);
    res.json(p);
  }catch(err){
    res.status(500).json({ message: 'Failed to create skill', error: err.message })
  }
};

exports.list = async (req, res) => {
  const items = await Skill.find({});
  res.json(items);
};
