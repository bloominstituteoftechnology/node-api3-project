const express = require("express");
const { validateUser, validateUserId } = require("../middleware/user");
const { validatePost, validatePostId } = require("../middleware/post");
const db = require("../users/userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting posts" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  postDb
    .getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting post" });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  posts.getById(req.params.id).then((post) => {
    res.status(200).json(post);
  });
  Posts.remove(req.params.id).catch((error) => {
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed",
    });
  });
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  postDb
    .update(req.params.id, req.params.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  posts.getById(req.params.id).then((post) => {
    if (!post) {
      res.status(404).json({ message: "invalid post id" });
    } else {
      req.post = post;
      next();
    }
  });
}

module.exports = router;
