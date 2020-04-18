const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  db.get(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Posts could not be retrieved",
      });
    });
});

router.get("/:id", validatePostId(), (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then((postID) => {
      res.status(200).json(postID);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The requested user's posts could not be retrieved",
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  db.remove(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Post failed to be deleted",
      });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
    .then((updatePost) => {
      res.status(200).json(updatePost);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Post could not be updated",
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    db.getById(req.params.id)
      .then((post) => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(404).json({
            message: "User ID not found",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  };
}

module.exports = router;
