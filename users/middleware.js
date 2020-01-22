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
					res.status(404).json({ error: 'id does not exist' });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: 'exception', err });
			});
	}
};
