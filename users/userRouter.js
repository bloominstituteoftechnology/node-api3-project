const express = require("express");

const router = express.Router();

const db = require("./userDb.js");
const PostDb = require("../posts/postDb.js");

// custom middleware imports
const validateUserId = require("./middleware/validateUserId.js");
const validateUser = require("./middleware/validateUser.js");
const validatePost = require("../posts/middleware/validatePost.js");

router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then(user => res.status(201).json({ user }))
    .catch(err =>
      res.status(500).json({
        message: "Something went wrong adding user.",
        error: err,
        error_message: err.message
      })
    );
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
        message: "Something went wrong gettings users.",
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
        message: "something went wrong gettings user",
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
        message: "sorry something went wrong in trying to get the users posts",
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
