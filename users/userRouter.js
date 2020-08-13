const express = require("express");
const { getUserPosts } = require("./userDb");
const validateUser = require("../middleware/validateUser");
const router = express.Router();
const users = require("../users/userDb");
const posts = require("../posts/postDb");
//user validation
router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err }));
});
//post validation
router.post("/:id/posts", validatePost, (req, res) => {
  const user = { ...req.body, user_id: req.params.id };
  posts
    .insert(user)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
});

router.get("/", (req, res) => {
  users
    .get(req.query)
    .then((users) => res.status(200).json(users))
    .catch((err) => status(500).json({ message: err }));
});
//validating user id
router.get("/:id", validateUserId, (req, res) => {
  users
    .getById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err }));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts could not be retrieved.",
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  users.getById(req.params.id).then((user) => {
    res.status(200).json(user);
  });
  users.remove(req.params.id).catch((error) => {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  });
});
//update
router.put("/:id", validateUser, validateUserId, (req, res) => {
  users
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  users.getById(req.params.id).then((user) => {
    if (!user) {
      res.status(404).json({ message: "invalid user id" });
    } else {
      req.user = user;
      next();
    }
  });
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else if (req.body) {
    return next();
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else if (req.body) {
    return next();
  }
}

module.exports = router;
