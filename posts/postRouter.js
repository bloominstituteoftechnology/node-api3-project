const express = require("express");
const postDB = require("./postDb");
const router = express.Router();
const validatePostId = require("../middleware/validatePostId");

// GET all posts
router.get("/", (req, res) => {
  postDB
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// GET post by id
router.get("/:id", validatePostId, (req, res) => {
  const post = req.post;

  res.status(200).json(post);
});

// DELETE post by id
router.delete("/:id", validatePostId, (req, res) => {
  const post = req.post;

  postDB
    .remove(post.id)
    .then((response) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Update (PUT) post by id
router.put("/:id", validatePostId, (req, res) => {
  const post = req.post;
  const postUpdates = req.body;

  if (postUpdates.text) {
    postDB
      .update(post.id, postUpdates)
      .then((response) => {
        res.status(204).end();
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({ message: "missing required text field " });
  }
});

module.exports = router;
