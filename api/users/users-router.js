const express = require("express");

const router = express.Router();

const {
  validateUserId,
  validateUser,
  validatePost,
  logger,
} = require("../middleware/middleware");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

router.post("/", validateUser, (req, res) => {
  Users.insert(req.user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "error creating user" });
    });
  // do your magic!
  // this needs a middleware to check that the request body is valid
});

router.get("/", logger, (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ message: "error retrieving users" });
    });
  // do your magic!
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params)
    .then(() => {
      res.status(200).json({ message: "user deleted" });
    })
    .catch(() => {
      res.status(500).json({ message: "error removing user" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params, req.body)
    .then(() => {
      res.status(200).json({ message: "user updated" });
    })
    .catch(() => {
      res.status(500).json({ message: "failed to update user" });
    });
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  const post = { user_id: req.params, ...req.validatedPost };
  Posts.insert(post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ message: "Error adding post" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Posts.getById(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: "error retrieving posts" });
    });
  // do your magic!
  // this needs a middleware to verify user id
});

// do not forget to export the router
module.exports = router;
