const userDb = require('./userDb.js');

module.exports = {
	validateUserId: function(req, res, next) {
		const { id } = req.params;

		userDb
			.getById(id)
			.then((user) => {
				if (user) {
					req.user = user;
					next();
				} else {
					res.status(400).json({ error: 'invalid user id' });
				}
			})
			.catch((err) => {
				res.status(500).json({ error: 'there was a problem getting the user' });
			});
	},

	validateUser: function(req, res, next) {
		const body = req.body;

		if (body.name) {
			next();
		} else if (body) {
			res.status(400).json({ error: 'missing user data' });
		} else {
			res.status(400).json({ error: 'missing required name field' });
		}
	},

	validatePostId: function(req, res, next) {
		const { id } = req.params;

		userDb
			.getUserPosts(id)
			.then((post) => {
				if (post) {
					req.posts = post;
					next();
				} else {
					res.status(400).json({ error: 'invalid user id' });
				}
			})
			.catch((err) => {
				res.status(500).json({ error: 'there was a problem getting the posts' });
			});
	},

	validatePost: function(req, res, next) {
		const body = req.body;

		if (body) {
			if (body.text) {
				next();
			} else {
				res.status(400).json({ error: 'missing required text field' });
			}
		} else {
			res.status(400).json({ error: 'missing post data' });
		}
	}
};
