// database for Posts
const Posts = require('../posts/postDb');

// database for users
const Users = require('../users/userDb');

// Logger
const logger = (req, res, next) => {
	console.log(`${req.method} ${req.url} ${Date.now()}`);
	next();
};

function validatePostId(req, res, next) {
	// do your magic!

	const id = req.params.id;

	Posts.getById(id)
		.then((post) => {
			if (post) {
				req.post = post;
				next();
			} else {
				res.status(400).json({ errorMessage: 'Invalid post id' });
			}
		})
		.catch((error) => {
			next(new Error('Could not validate the post id(database error)'));
		});
}

function validatePost(req, res, next) {
	// do your magic!

	if (req.body) {
		if (req.body.text) {
			next();
		} else {
			res.status(400).json({ errorMessage: 'Missing required text field' });
		}
	} else {
		res.status(400).json({ errorMessage: 'Missing post data' });
	}
}

function validateUserId(req, res, next) {
	// do your magic!
	const id = req.params.id;

	Users.getById(id)
		.then((user) => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(400).json({ errorMessage: 'Invalid User Id' });
			}
		})
		.catch((error) => {
			next(new Error('Could not validate this user ID (database error)'));
		});
}

function validateUser(req, res, next) {
	// do your magic!

	if (req.body) {
		if (req.body.name) {
			next();
		} else {
			res.status(400).json({ errorMessage: 'Missing required name field' });
		}
	} else {
		res.status(400).json({ errorMessage: 'Missing user data' });
	}
}

module.exports = {
	logger,
	validatePostId,
	validatePost,
	validateUser,
	validateUserId,
};
