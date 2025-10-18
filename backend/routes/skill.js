const express = require('express');
const router = express.Router();
const controller = require('../controllers/skillController');

router.get('/', controller.list);
router.post('/', controller.addSkill);

module.exports = router;
