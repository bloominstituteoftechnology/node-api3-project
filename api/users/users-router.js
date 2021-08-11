const express = require("express");
const Users = require("./users-model.js");
const Posts = require("../posts/posts-model.js");
const mw = require("../middleware/middleware.js");

const router = express.Router();
const { validateUserId, validateUser, validatePost } = mw;

// GET [] all users
router.get("/", (req, res) => {
  Users.get()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json(err.message));
});

// GET user {} by id
router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// POST new user {}
router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err.message));
});

// PUT updated user {} by id
router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err.message));
});

// DELETE user {} by id
router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err.message));
});

// GET posts [] by user ID
router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => res.status(500).json(err.message));
});

// POST new post {}
router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  const newPost = await Posts.insert({
    user_id: req.params.id,
    text: req.body.text,
  });
  res.status(201).json(newPost);
});

module.exports = router;
