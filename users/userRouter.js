const express = require("express");
const userDB = require("./userDb");
const postDB = require("../posts/postDb");
const router = express.Router();
const validateUser = require("../middleware/validateUser");
const validateUserId = require("../middleware/validateUserId");
const validatePost = require("../middleware/validatePost");

// Create (POST) a new user
router.post("/", validateUser, (req, res) => {
  userDB
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Create (POST) a new post by user
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const user = req.user;
  const post = {
    ...req.body,
    user_id: user.id,
  };

  postDB
    .insert(post)
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// GET all users
router.get("/", (req, res) => {
  userDB
    .get()
    .then((users) => {
      if (users.length) {
        res.status(200).json(users);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "There was an error getting the list of users." });
    });
});

// GET user by id
router.get("/:id", validateUserId, (req, res) => {
  const user = req.user;

  res.status(200).json(user);
});

// GET posts by user
router.get("/:id/posts", validateUserId, (req, res) => {
  const user = req.user;

  userDB
    .getUserPosts(user.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// DELETE user by id
router.delete("/:id", validateUserId, (req, res) => {
  const user = req.user;

  userDB
    .remove(user.id)
    .then((response) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Update (PUT) user by id
router.put("/:id", validateUser, validateUserId, (req, res) => {
  const user = req.user;
  const userUpdates = req.body;

  userDB
    .update(user.id, userUpdates)
    .then((response) => {
      console.log("Response", response);
      res.status(200).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
