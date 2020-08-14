const express = require("express");
const postDb = require("./postDb");
const logger = require("../middleware/logger");
const validatePost = require("../middleware/validatePost");
const router = express.Router();

router.get("/", logger(), (req, res) => {
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

// router.post("/:id", validatePost(), (req, res) => {
//   users
//     .insert(req.body)
//     .then((user) => res.status(200).json(user))
//     .catch((err) => res.status(500).json({ message: err }));
// });

router.get("/:id", logger(), validatePost(), (req, res) => {
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

router.delete("/:id", logger(), validatePost(), (req, res) => {
  postDb.getById(req.params.id).then((post) => {
    res.status(200).json(post);
  });
  postDb.remove(req.params.id).catch((error) => {
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed",
    });
  });
});

router.put("/:id", logger(), validatePost, (req, res) => {
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

// function validatePostId(req, res, next) {
//   posts.getById(req.params.id).then((post) => {
//     if (!post) {
//       res.status(404).json({ message: "invalid post id" });
//     } else {
//       req.post = post;
//       next();
//     }
//   });
// }

module.exports = router;
