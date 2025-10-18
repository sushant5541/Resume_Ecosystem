const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');

router.get('/', controller.list);
router.post('/', controller.addProject);

module.exports = router;
