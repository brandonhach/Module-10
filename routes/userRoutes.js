const express = require('express');
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middlewares/auth');
const { logInLimiter } = require('../middlewares/rateLimiter');
const { body } = require('express-validator');

const router = express.Router();

router.get('/new', isGuest, controller.new);
router.post('/', isGuest, controller.create);
router.get('/login', isGuest, controller.getUserLogin);
router.post(
	'/login',
	isGuest,
	logInLimiter,
	[
		body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
		body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({
			min: 8,
			max: 64,
		}),
	],
	controller.login
);
router.get('/profile', isLoggedIn, controller.profile);
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
