const express = require("express");

const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
	db.get()
		.then((posts) => res.status(200).json(posts))
		.catch(() =>
			res.status(500).json({ errorMessage: "Unable to retrieve posts" })
		);
});

router.use("/:id", validatePostId);

router.get("/:id", (req, res) => {
	db.getById(req.params.id)
		.then((post) => res.status(200).json(post))
		.catch(() =>
			res.status(500).json({ errorMessage: "Unable to retrieve post" })
		);
});

router.delete("/:id", (req, res) => {
	db.remove(req.params.id)
		.then((count) => res.sendStatus(200))
		.catch(() =>
			res.status(500).json({ errorMessage: "Unable to remove post" })
		);
});

router.put("/:id", (req, res) => {
	db.update(req.params.id, req.body)
		.then(() => {
			db.getById(req.params.id)
				.then((post) => res.status(201).json(post))
				.catch(() =>
					res.status(500).json({ errorMessage: "Unable to find updated post" })
				);
		})
		.catch(() => {
			res.status(500).json({ errorMessage: "Unable to update post" });
		});
});

// custom middleware

function validatePostId(req, res, next) {
	db.getById(req.params.id)
		.then((post) => {
			if (post) {
				next();
			} else {
				res.status(400).json({ message: "Invalid post id" });
			}
		})
		.catch((err) =>
			res
				.status(500)
				.json({ errorMessage: "Error connecting to posts database" })
		);
}

module.exports = router;
