const { body, validationResult } = require('express-validator');

exports.validateId = (req, res, next) => {
	let id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		let err = new Error('Invalid story id');
		err.status = 400;
		return next(err);
	} else {
		return next();
	}
};

exports.validateStory = [
	body('title', 'Title cannot be empty').trim().escape().notEmpty(),

	body('content', 'Content must be at least 10 characters long').trim().escape().isLength({ min: 10 }),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			errors.array().forEach((error) => {
				req.flash('error', error.msg);
			});
			return res.redirect('back');
		}
		next();
	},
];
