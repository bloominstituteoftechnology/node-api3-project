const express = require("express");
const Post = require("./postDb");
const restricted = require("../restricted-middlewares/restricted");

const router = express.Router();

router.get("/", restricted, (req, res) => {
  // do your magic!
  Post.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ errorMessage: "there was an error" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  Post.remove(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", validatePostId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Post.update(id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errorMessage: "there was a problem updating the post" });
    });
});

// custom middleware

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ errorMessage: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ errorMessage: "missing required text field" });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Post.getById(id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ errorMessage: "id not found" });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errorMessage: "there was an error accessing the id" });
    });
}

module.exports = router;
