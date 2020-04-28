const express = require("express");
const users = require("../users/userDb");
const posts = require("../posts/postDb");
const validatePost = require("../middleware/validatePost");
const validateUser = require("../middleware/validateUser");
const router = express.Router();

router.post("/", validateUser(), (req, res) => {
  // users
  //   .insert(req.body.name)
  //   .then((res) => res.status(201).json({ message: "User created" }))
  //   .catch((err) => res.status(500).json({ message: err }));
  users
    .insert(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err }));
});

router.post("/:id/posts", validatePost(), (req, res) => {
  posts
    .insert({ text: req.body.text, user_id: req.params.id })
    .then((post) => res.status(201).json({ post }))
    .catch((err) => res.status(500).json({ message: err }));
});

router.get("/", (req, res) => {
  users
    .get()
    .then((users) => res.status(200).json(users))
    .catch((err) => status(500).json({ message: err }));
});

router.get("/:id", (req, res) => {
  users
    .getById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err }));
});

router.get("/:id/posts", (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).jsonn({ message: err }));
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

module.exports = router;
