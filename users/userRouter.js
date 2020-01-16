const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");
const postRouter = require("../posts/postRouter");

const router = express.Router();

router.use("/:id/posts", postRouter);

router.post("/", validateUser(), (req, res) => {
  users
    .insert(req.user)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: "User cannot be made" }));
});

router.get("/", (req, res) => {
  users
    .get()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: "could not find users" }));
});

router.get("/:id", validateUserId(), (req, res) => {
  res.json(req.user);
});

router.post("/:id/posts", validatePost(), validateUserId(), (req, res) => {
  posts
    .insert(req.text)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: "Post cannot be made" }));
});

router.delete("/:id", validateUserId(), (req, res) => {
  users
    .remove(req.params.id)
    .then(count => {
      res.status(200).json({ message: `User has been deleted` });
    })
    .catch(err => res.status(404).json({ message: "could not delete user" }));
});

router.put("/:id", validateUserId(), validateUser(), (req, res) => {
  users
    .update(req.params.id, req.user)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: "could not update user" }));
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "could not find user with ID" });
        }
      })
      .catch(err =>
        res.status(500).json({ message: "error getting user with this ID" })
      );
  };
}

function validateUser() {
  return (req, res, next) => {
    resource = {
      name: req.body.name
    };

    if (!req.body.name) {
      return res.status(404).json({ message: "missing user data" });
    } else {
      req.user = resource;
      next();
    }
  };
}

function validatePost() {
  return (req, res, next) => {
    resource = {
      text: req.body.text,
      user_id: req.params.id
    };

    if (!req.body.text) {
      return res.status(404).json({ message: "missing post data" });
    } else {
      req.text = resource;
      next();
    }
  };
}

module.exports = router;