const express = require('express');
const router = express.Router();
const controller = require('../controllers/hackathonController');

router.get('/', controller.list);
router.post('/', controller.addHackathon);

module.exports = router;
