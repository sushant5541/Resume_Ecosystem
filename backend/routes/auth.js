const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { register, login, me } = require('../controllers/authController');
const auth = require('../middleware/auth');

// registration with validation
router.post('/register',
	body('name').trim().notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Valid email is required'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		next();
	},
	register
);

router.post('/login',
	body('email').isEmail().withMessage('Valid email is required'),
	body('password').notEmpty().withMessage('Password is required'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		next();
	},
	login
);

// get current user
router.get('/me', auth, me);

module.exports = router;


