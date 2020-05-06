const express = require("express");
const User = require("./userDb");
const Post = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errorMessage: "there was a problem adding the user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  Post.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "there was a problem adding a post" });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  User.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "there was a problem getting the users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const user_id = req.params.id;
  User.getUserPosts(user_id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "there was an error getting the post" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errorMessage: "there was a problem deleting the user" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params;
  User.update(id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errorMessage: "there was a problem updating the user" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  User.getById(id).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ errorMessage: "invalid id" });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!Object.keys(req.body).length) {
    res.status(400).json({ errorMessage: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ errorMessage: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
