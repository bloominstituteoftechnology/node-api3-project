const posts = require("../../posts/postDb.js");

function validatePost() {
	return (req, res, next) => {
		if (!req.body.text) {
			return res.status(400).json({ message: "Text required for post." });
		}
		next();
	};
}

module.exports = {
	validatePost
};