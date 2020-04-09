const express = require('express');

const router = express.Router();

const userDb = require("./userDb.js");
const postDb = require("../posts/postDb.js")

router.post("/", validateUser(), async (req, res) => {
  // do your magic!
	try {
		const { name } = req.body;
		console.log("name: ", name);
		res.status(201).json(await userDb.insert({ name }));
	} catch (error) {
		res.status(500).json({
			error,
			errorMessage: "There was an error while saving the post to the database"
		});
	}
});

router.post("/:id/posts",	validateUserId(),	validatePostContent(),
	async (req, res) => {
    // do your magic!
		try {
			const post = req.body;
			console.log("post: ", post);
			res.status(201).json(await postDb.insert(post));
		} catch (error) {
			res.status(500).json({
				error,
				errorMessage: "There was an error while saving the post to the database"
			});
		}
	}
);

router.get("/", async (req, res) => {
  // do your magic!
	const users = await userDb.get();
	if (users) {
		return res.status(200).json(users);
	} else {
		return res.status(500).json({ error: "The users could not be retrieved." });
	}
});

router.get("/:id", validateUserId(), (req, res) => {
	res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId(), validatePost(), (req, res) => {
	res.status(200).json(req.post);
});

router.delete("/:id", (req, res) => {
	// do your magic!
});

router.put("/:id", (req, res) => {
	// do your magic!
});


//custom middleware

function validateUserId() {
	return (req, res, next) => {
		userDb
			.getById(req.params.id)
			.then(user => {
				if (user) {
					req.user = user;
					next();
				} else {
					res
						.status(404)
						.json({ message: `User with id ${req.params.id} does not exist` });
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

function validateUser() {
	return (req, res, next) => {
		// const { name } = req.body;
		if (!req.body.name) {
			return res.status(400).json({ message: "missing required name field." });
		}
		next();
	};
}

function validatePost() {
	return (req, res, next) => {
		userDb
			.getUserPosts(req.params.id)
			.then(post => {
				if (post.length < 1) {
					res.status(404).json({ message: "This user does not have a post." });
				} else {
					req.post = post;
					next();
				}
			})
			.catch(err => {
				next(err);
			});
	};
}

function validatePostContent() {
	return (req, res, next) => {
		const { text } = req.body;
		if (!text) {
			return res.status(400).json({ message: "missing required text field." });
		}
		next();
	};
}

module.exports = router;
