const rateLimit = require('express-rate-limit');

exports.logInLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 min time window
	max: 5,
	message: 'Too many login requests. Try again later.',
});
