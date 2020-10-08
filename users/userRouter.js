const express = require("express");

const router = express.Router();

const users = require("./userDb");
const posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating the user.",
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  posts
    .insert({
      text: req.body.text,
      user_id: req.params.id,
    })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error creating this post.",
      });
    });
});

router.get("/", (req, res) => {
  users
    .get()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error getting all users",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      message: "Error retrieving this user's posts.";
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  users
    .remove(req.params.id)
    .then((user) => {
      res.json({
        message: "User successfully deleted.",
      });
    })
    .catch((err) => {
      message: "Error deleting this user.";
    });
});

router.put("/:id", validateUserId, (req, res) => {
  users
    .update(req.params.id, req.body)
    .then((user) => {
      console.log(user);
      res.json({
        id: req.params.id,
        name: req.body.name,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error updating this post.",
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  users
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          message: "Invalid user id",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving the user.",
      });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      message: "Missing user data.",
    });
  } else if (!req.body.name) {
    return res.status(400).json({
      message: "Missing required name field.",
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      message: "Missing post data.",
    });
  } else if (!req.body.text) {
    return res.status(400).json({
      message: "Missing required text field.",
    });
  } else {
    next();
  }
}

module.exports = router;
