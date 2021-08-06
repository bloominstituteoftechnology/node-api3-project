const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
// The middleware functions also need to be required
const {
	validateUser,
	validateUserId,
	validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
	// RETURN AN ARRAY WITH ALL THE USERS
	Users.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.get("/:id", validateUserId, (req, res) => {
	// RETURN THE USER OBJECT
	// this needs a middleware to verify user id
	const { id } = req.params;
	Users.getById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.post("/", validateUser, (req, res) => {
	// RETURN THE NEWLY CREATED USER OBJECT
	// this needs a middleware to check that the request body is valid
	Users.insert({
		name: req.body.name,
	})
		.then((newUser) => {
			res.status(201).json(newUser);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
	// RETURN THE FRESHLY UPDATED USER OBJECT
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	Users.update(req.params.id, {
		name: req.body.name,
	})
		.then((updated) => {
			res.status(200).json(updated);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.delete("/:id", validateUserId, (req, res) => {
	// RETURN THE FRESHLY DELETED USER OBJECT
	// this needs a middleware to verify user id
	const { id } = req.params;
	Users.getById(id)
		.then((user) => {
			Users.remove(id)
				.then(() => {
					res.status(200).json(user);
				})
				.catch((err) => {
					res.status(500).json({ message: err.message });
				});
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.get("/:id/posts", validateUserId, (req, res) => {
	// RETURN THE ARRAY OF USER POSTS
	// this needs a middleware to verify user id
	Users.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
	// RETURN THE NEWLY CREATED USER POST
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	const newPost = {
		user_id: req.params.id,
		text: req.body.text,
	};
	Posts.insert(newPost)
		.then((postRes) => {
			res.status(201).json(postRes);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

// do not forget to export the router
module.exports = router;
