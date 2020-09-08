const users = require('../users/userDb');

const validateUserId = () => {
	return (req, res, next) => {
		users
			.getById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user;
					next();
				} else {
					res.status(404).json({ message: 'User Not Found.' });
				}
			})
			.catch((err) => {
				next(err);
			});
	};
};

const validateUser = () => {
	return (req, res, next) => {
		if (!req.body) {
			res.status(400).json({ message: 'Missing User Data.' });
		} else if (!req.body.name) {
			res.status(400).json({ message: 'Missing required name field.' });
		} else {
			next();
		}
	};
};

const validatePost = () => {
	return (req, res, next) => {
		if (!req.body) {
			res.status(400).json({ message: 'Missing Post Data.' });
		} else if (!req.body.text) {
			res.status(400).json({ message: 'Missing required text field.' });
		} else {
			next();
		}
	};
};
module.exports = {
	validateUserId,
	validateUser,
	validatePost,
};
