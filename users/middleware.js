const userDb = require('./userDb.js');

module.exports = {
	validateUserId: function(req, res, next) {
		const { id } = req.params;

		userDb
			.getById(id)
			.then((res) => {
				if (res) {
					req.user = res;
					next();
				} else {
					res.status(400).json({ error: 'invalid user id' });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: 'there was a problem getting the user' });
			});
	},

	validateUser: function(req, res, next) {
		const body = req.body;
		console.log(body);

		if (body.name) {
			next();
		} else if (body) {
			res.status(400).json({ error: 'missing user data' });
		} else {
			res.status(400).json({ error: 'missing required name field' });
		}
	},

	validatePost: function(req, res, next) {
		const body = req.body;
		console.log(body);

		if (body.name) {
			next();
		} else if (body) {
			res.status(400).json({ error: 'missing post data' });
		} else {
			res.status(400).json({ error: 'missing required text field' });
		}
	}
};
