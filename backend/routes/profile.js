const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

// Get current user's profile
router.get('/', auth, profileController.getProfile);

// Update profile
router.put('/', auth, profileController.updateProfile);

// Delete profile
router.delete('/', auth, profileController.deleteProfile);

module.exports = router;
