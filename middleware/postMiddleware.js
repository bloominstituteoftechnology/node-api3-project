const posts = require('../posts/postDb');

module.exports = () => {
	return async (req, res, next) => {
		try {
			const post = await posts.getById(req.params.id);

			if (post) {
				req.post = post;
				next();
			} else {
				res.status(404).json({ message: 'Post Not Found.' });
			}
		} catch (error) {
			next(error);
		}
	};
};
