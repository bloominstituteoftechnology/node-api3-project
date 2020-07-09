const express = require("express");
const Posts = require("./postDb.js");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  Posts.remove(req.post.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(req.post);
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the post",
      });
    });
});

router.put("/:id", validatePostId, validatePost, (req, res) => {
  Posts.update(req.post.id, req.body)
    .then((count) => {
      if (count) {
        Posts.getById(req.post.id)
          .then((post) => {
            res.status(200).json(post);
          })
          .catch((err) => {
            req
              .status(500)
              .json({ message: "An error occured during getting post" });
          });
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the post",
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}
function validatePost(req, res, next) {
  if (!(Object.keys(req.body).length === 0)) {
    if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
