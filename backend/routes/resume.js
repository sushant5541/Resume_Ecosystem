const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getResume, saveResume } = require('../controllers/resumeController');

router.get('/:email', getResume);
// protect saveResume for authenticated users; allow anonymous saves with email too
router.post('/', auth, saveResume);

module.exports = router;
