const express = require("express");
const userDB = require("./userDb");
const router = express.Router();
const validateUser = require("../middleware/validateUser");
const validateUserId = require("../middleware/validateUserId");

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

router.post("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
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
      console.log("Response", response);
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
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

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
