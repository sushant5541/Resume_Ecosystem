const Hackathon = require('../models/Hackathon');

exports.addHackathon = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.name.trim()) return res.status(400).json({ message: 'Hackathon name is required' });
  try{
    const p = await Hackathon.create(data);
    res.json(p);
  }catch(err){
    res.status(500).json({ message: 'Failed to create hackathon', error: err.message })
  }
};

exports.list = async (req, res) => {
  const items = await Hackathon.find({});
  res.json(items);
};
