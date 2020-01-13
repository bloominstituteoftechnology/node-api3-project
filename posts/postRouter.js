const express = require("express");
const router = express.Router();
const db = require("./postDb.js");

// middleware
const validatePostId = require("./middleware/validatePostId.js");
const validatePost = require('./middleware/validatePost.js')

router.get("/", (req, res) => {
  db.get()
    .then(posts => res.status(200).json({ posts }))
    .catch(err =>
      res.status(500).json({
        message: "something went wrong trying to grab posts",
        error: err,
        error_message: err.message
      })
    );
});

router.get("/:id", validatePostId, (req, res) => {
  db.getById(req.params.id)
    .then(post => res.status(200).json({ post }))
    .catch(err =>
      res.status(500).json({
        message: "something went wrong trying to get that post",
        error: err,
        error_message: err.message
      })
    );
});

router.delete("/:id", validatePostId, (req, res) => {
  db.remove(req.params.id)
    .then(() => res.status(200).json({ message: "successfully deleted post" }))
    .catch(err =>
      res.status(500).json({
        message: "something went wrong trying to delete that post",
        error: err,
        error_message: err.message
      })
    );
});

router.put("/:id", validatePostId, validatePost, (req, res) => {
  db.update(req.params.id, req.body)
    .then(() => res.status(200).json({ message: "successfully updated post" }))
    .catch(err =>
      res.status(500).json({
        message: "something went wrong trying to update that post",
        error: err,
        error_message: err.message
      })
    );
});

module.exports = router;
