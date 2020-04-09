const posts = require("../../posts/postDb.js");

function validatePostId() {
	return (req, res, next) => {
		posts
			.getById(req.params.id)
			.then(post => {
				if (post) {
					req.post = post;
					// console.log("post: ", post);
					next();
				} else {
					res
						.status(404)
						.json({ message: `Post with id ${req.params.id} not found` });
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

module.exports = {
	validatePostId
};