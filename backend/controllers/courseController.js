const Course = require('../models/Course');

exports.addCourse = async (req, res) => {
  const data = req.body;
  if (!data.title || !data.title.trim()) return res.status(400).json({ message: 'Course title is required' });
  try{
    const p = await Course.create(data);
    res.json(p);
  }catch(err){
    res.status(500).json({ message: 'Failed to create course', error: err.message })
  }
};

exports.list = async (req, res) => {
  const items = await Course.find({});
  res.json(items);
};
