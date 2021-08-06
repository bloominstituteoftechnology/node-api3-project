const Users = require("../users/users-model");
function logger(req, res, next) {
	console.log(
		`A ${req.method} request, performed on ${req.url}, at: ${Date.now()}`
	);
	next();
}

function validateUserId(req, res, next) {
	Users.getById(req.params.id)
		.then((user) => {
			if (user) {
				next();
			} else {
				res.status(404).json({ message: "user not found" });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
}

function validateUser(req, res, next) {
	if (req.body.name) {
		Users.get()
			.then((users) => {
				invalidNames = new Set(users.map((user) => user.name));
				if (invalidNames.has(req.body.name)) {
					res
						.status(400)
						.json({ message: "A user with this name already exists" });
				} else {
					next();
				}
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	} else {
		res.status(400).json({ message: "missing required name field" });
	}
}

function validatePost(req, res, next) {
	if (req.body.text) {
		next();
	} else {
		res.status(400).json({ message: "missing required text field" });
	}
}

// do not forget to expose these functions to other modules
module.exports = {
	logger,
	validateUserId,
	validateUser,
	validatePost,
};
