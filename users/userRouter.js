const express = require("express");
const userDB = require("./userDb");

const router = express.Router();

// Create (POST) a new user
router.post("/", (req, res) => {
  userDB
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/:id/posts", (req, res) => {
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

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
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
