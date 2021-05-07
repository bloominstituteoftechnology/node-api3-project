const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Posts = require("../posts/posts-model");
const Users = require("./users-model");
const {
	validateUserId,
	validateUser,
	validatePost,
} = require("../middleware/middleware.js");

const router = express.Router();
router.use("/:id", validateUserId(Users));

router.get("/", (req, res) => {
	// RETURN AN ARRAY WITH ALL THE USERS
	Users.get()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "Error fetching posts",
			});
		});
});

router.get("/:id", (req, res) => {
	// RETURN THE USER OBJECT
	if (req.user) {
		res.status(200).json(req.user);
	}
});

router.post("/", validateUser, (req, res) => {
	// RETURN THE NEWLY CREATED USER OBJECT
	// this needs a middleware to check that the request body is valid
	Users.insert(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "Error posting user",
			});
		});
});

router.put("/:id", validateUser, (req, res) => {
	// RETURN THE FRESHLY UPDATED USER OBJECT
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	Users.update(req.params.id, req.body).then((count) => {
		if (count) {
			Users.getById(req.params.id).then((user) => {
				res.status(200).json(user);
			});
		}
	});
});

router.delete("/:id", (req, res) => {
	// RETURN THE FRESHLY DELETED USER OBJECT
	// this needs a middleware to verify user id
	Users.remove(req.params.id)
		.then((count) => {
			if (count) {
				res.status(200).json(req.user);
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "An error occurred",
			});
		});
});

router.get("/:id/posts", (req, res) => {
	// RETURN THE ARRAY OF USER POSTS
	// this needs a middleware to verify user id
	Users.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "An error occurred fetching posts",
			});
		});
});

router.post("/:id/posts", validatePost, (req, res) => {
	// RETURN THE NEWLY CREATED USER POST
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	Posts.insert({
		...req.body,
		user_id: req.user.id,
	})
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: "Server error posting post",
			});
		});
});

// do not forget to export the router
module.exports = router;
