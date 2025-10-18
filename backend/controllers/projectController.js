const Project = require('../models/Project');

exports.addProject = async (req, res) => {
  const data = req.body;
  if (!data.title || !data.title.trim()) return res.status(400).json({ message: 'Project title is required' });
  try{
    const p = await Project.create(data);
    res.json(p);
  }catch(err){
    res.status(500).json({ message: 'Failed to create project', error: err.message })
  }
};

exports.list = async (req, res) => {
  const items = await Project.find({});
  res.json(items);
};
