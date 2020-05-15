const express = require("express");
const {
	get,
	getById,
	getUserPosts,
	insert,
	update,
	remove,
} = require("./userDb");
const Post = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, async (req, res) => {
	const { name } = req.body;

	try {
		const createdUser = await insert({ name });
		res.status(200).json(createdUser);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error creating user" });
	}
});

router.post("/:id/posts", [validateUserId, validatePost], async (req, res) => {
	const newPost = req.body;

	try {
		const createdPost = await Post.insert(newPost);
		res.status(200).json(createdPost);
	} catch (error) {
		res.status(500).json({ message: "Error creating new post" });
	}
});

router.get("/", async (req, res) => {
	try {
		const users = await get();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error getting users" });
	}
});

router.get("/:id", validateUserId, async (req, res) => {
	const { id } = req.params;

	try {
		const user = await getById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error getting user" });
	}
});

router.get("/:id/posts", validateUserId, async (req, res) => {
	const { id } = req.params;

	try {
		const posts = await getUserPosts(id);
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ errorMessage: "Error getting posts" });
	}
});

router.delete("/:id", validateUserId, async (req, res) => {
	const { id } = req.params;

	try {
		const deletedUser = await remove(id);
		if (deletedUser > 0) {
			res.status(200).json({ message: "User deleted" });
		} else {
			res.status(400).json({ message: "No users were deleted" });
		}
	} catch (error) {
		res.status(500).json({ errorMessage: "Error deleting user" });
	}
});

router.put("/:id", validateUserId, async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const updatedUser = await update(id, changes);
		if (updatedUser > 0) {
			res.status(200).json({ message: "User updated" });
		} else {
			res.status(400).json({ message: "No changes were made" });
		}
	} catch (error) {
		res.status(500).json({ errorMessage: "Error updating user" });
	}
});

//custom middleware

async function validateUserId(req, res, next) {
	const { id } = req.params;

	try {
		const found = await getById(id);

		!id
			? res.status(404).json({ message: "Must provide user id" })
			: found
			? (req.user = found)
			: res.status(404).json({ message: "Invalid user id" });

		next();
	} catch (error) {
		res.status(500).json({ errorMessage: "Error validating id" });
	}
}

function validateUser(req, res, next) {
	const newUser = req.body;
	const { name } = newUser;

	!Object.keys(newUser).length
		? res.status(400).json({ message: "Missing user data" })
		: !name
		? res.status(400).json({ message: "Missing required name dield" })
		: next();
}

function validatePost(req, res, next) {
	const newPost = req.body;
	const { text } = newPost;

	!newPost
		? res.status(400).json({ message: "Missing post data" })
		: !text
		? res.status(400).json({ message: "Missing required text dield" })
		: next();
}

module.exports = router;
