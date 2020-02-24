const express = require("express");
const router = express.Router();
const db = require("./userDb.js");
const PostDb = require("../posts/postDb.js");

// Custom Middleware Imports
const ValidateUserId = require("../posts/middleware/ValidateUserId.js");
const ValidateUser = require("../posts/middleware/validateUser.js");
const ValidatePost = require("../posts/middleware/validatePost.js");

router.post("/", ValidateUser, (req, res) => {
  db.insert(req.body)
    .then(user => res.status(201).json({ user }))
    .catch(err => 
      res.status(500).json({
        message: "Something went wrong adding the user",
        error: err,
        error_message: err.message
      }));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const newPost = {
    user_id: req.params.id,
    text: req.body.text
  };
  PostDb.insert(newPost)
    .then(post => res.status(200).json({ post }))
    .catch(err =>
      res.status(500).json({
        message: "sorry something went wrong adding that post",
        error: err,
        error_message: err.message
      })
    );
});

router.get("/", (req, res) => {
  db.get()
    .then(users => res.status(200).json({ users }))
    .catch(err =>
      res.status(500).json({
        message: "Something went wrong getting the users.",
        error: err,
        error_message: err.message
      })
    );
});

router.get("/:id", validateUserId, (req, res) => {
  db.getById(req.params.id)
    .then(user => res.status(200).json({ user }))
    .catch(err =>
      res.status(500).json({
        message: "something went wrong getting the user",
        error: err,
        error_message: err.message
      })
    );
});

router.get("/:id/posts", validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => res.status(200).json({ posts }))
    .catch(err =>
      res.status(500).json({
        message: "sorry something went wrong trying to get the users posts",
        error: err,
        error_message: err.message
      })
    );
});

router.delete("/:id", validateUserId, (req, res) => {
  db.remove(req.params.id)
    .then(() =>
      res.status(200).json({ success_message: "User successfully deleted." })
    )
    .catch(err =>
      res.status(500).json({
        message: "sorry something went wrong with deleting that user",
        error: err,
        error_message: err.message
      })
    );
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  db.update(req.params.id, req.body)
    .then(() => res.status(200).json({ message: "user successfully updated." }))
    .catch(err =>
      res.status(500).json({
        message: "something went wrong updating user",
        error: err,
        error_message: err.message
      })
    );
});

module.exports = router;
