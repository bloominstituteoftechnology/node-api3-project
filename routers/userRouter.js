const express = require("express");
const { validateUserId } = require("../middleware/userMiddleware");
const { remove } = require("./userDb");
const users = require("./userDb");
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  // do your magic!
  const getUsers = users.get();

  getUsers
    .then((userData) => {
      console.log("I am userData", userData);
      return res.status(200).json(userData);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

router.get("/:id", validateUserId(), (req, res) => {
  // I need to validate the incoming user ID
  const user = req.user;
  res.status(200).json(user);
});

router.get("/:id/posts", validateUserId(), (req, res) => {
  const id = req.id;
  const getUserPosts = users.getUserPosts(id);
  getUserPosts
    .then((posts) => {
      if (posts[0]) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: `User with id:${id} has no post` });
      }
    })
    .catch((err) => {
      next();
    });
});

router.delete("/:id", validateUserId(), (req, res) => {
  // do your magic!
  const id = req.id;
  const removeUser = users.remove(id);

  removeUser
    .then((user) => {
      if (user) {
        res
          .status(200)
          .json({ message: `User with id:${id} has successfuly been deleted` });
      }
    })
    .catch((err) => {
      next();
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
