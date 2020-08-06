const express = require("express");
const Posts = require("../posts/postDb");
const { restart } = require("nodemon");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get({}).then((response) => {
    res.status(200).json(response);
  });
});

router.get("/:id", validatePostId, (req, res) => {
  requestedPost = req.params.id;

  Posts.getById(requestedPost)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "there was an error retrieving the posts" });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  let requestedPost = req.params.id;

  Posts.remove(requestedPost).then((response) => {
    if (response === 0) {
      res
        .status(500)
        .json({ error: "there was an error while deleting the record" });
    } else {
      res.status(200).json({
        message: `records for post with ID ${requestedPost} have been deleted`,
      });
    }
  });
});

router.put("/:id", validatePostId, validateBody, (req, res) => {
  let requestedPost = req.params.id;
  let updatedPost = req.body;

  Posts.update(requestedPost, updatedPost)
    .then((response) => {
      response === 0
        ? res
            .status(500)
            .json({ error: "there was an error while updating the post" })
        : res.status(200).json({ message: "post successfully updated" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "there was an error while updating the post" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  requestedPost = req.params.id;

  Posts.getById(requestedPost)
    .then((response) => {
      if (!response) {
        res.status(400).json({ error: "Invalid Post ID" });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(400).json({ error: "Invalid Post ID" });
    });
}

function validateBody(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else if (!req.body) {
    res.status(400).json({ message: "missing body" });
  } else {
    next();
  }
}

module.exports = router;
