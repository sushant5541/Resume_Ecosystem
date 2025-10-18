const express = require('express');
const router = express.Router();
const controller = require('../controllers/experienceController');

router.get('/', controller.list);
router.post('/', controller.addExperience);

module.exports = router;
