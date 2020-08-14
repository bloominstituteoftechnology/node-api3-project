const express = require("express");
const users = require("../users/userDb");
const posts = require("../posts/postDb");
const logger = require("../middleware/logger");
const validateUser = require("../middleware/validateUser");
const validateUserId = require("../middleware/validateUserId");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err }));
});

router.get("/", (req, res) => {
  users
    .get()
    .then((users) => res.status(200).json(users))
    .catch((err) => status(500).json({ message: err }));
});
router.get("/:id", validateUserId(), (req, res) => {
  users
    .getById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err }));
});
router.get("/:id/posts", validateUserId(), (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).jsonn({ message: err }));
});
router.delete("/:id", validateUserId(), (req, res) => {
  users
    .remove(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err }));
});

router.put("/:id", validateUserId(), (req, res) => {
  users
    .update(req.params.id, req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ message: err }));
});

//custom middleware

// function validateUserId(req, res, next) {
//   users.getById(req.params.id).then((user) => {
//     if (!user) {
//       res.status(404).json({ message: "invalid user id" });
//     } else {
//       req.user = user;
//       next();
//     }
//   });
// }

// function validateUser(req, res, next) {
//   if (Object.keys(req.body).length === 0) {
//     res.status(400).json({ message: "missing user data" });
//   } else if (!req.body.name) {
//     res.status(400).json({ message: "missing required name field" });
//   } else if (req.body) {
//     return next();
//   }
// }

// function validatePost(req, res, next) {
//   if (Object.keys(req.body).length === 0) {
//     res.status(400).json({ message: "missing post data" });
//   } else if (!req.body.text) {
//     res.status(400).json({ message: "missing required text field" });
//   } else if (req.body) {
//     return next();
//   }
// }

module.exports = router;
