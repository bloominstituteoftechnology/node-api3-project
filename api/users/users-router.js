const express = require("express");

const router = express.Router();

const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
const Users = require("./users-model");

router.post("/", validateUser, (req, res) => {
  Users.insert(req.user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500), json({ message: "error creating user" });
    });
  // do your magic!
  // this needs a middleware to check that the request body is valid
});

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
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
    .catch((err) => {
      res.status(500).json({ message: "error removing user" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params, req.body)
    .then(() => {
      res.status(200).json({ message: "user updated" });
    })
    .catch((err) => {
      res.status(500).json({ message: "failed to update user" });
    });
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

// do not forget to export the router
