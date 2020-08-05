const express = require("express");
const validateUserID = require("./validateUserIdMW");
const Users = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  let newUser = req.body;

  Users.insert(newUser)
    .then((response) => {
      return res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

router.post("/:id/posts", validateUserID, (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  Users.get({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/:id", validateUserID, (req, res) => {
  // do your magic!
});

router.get("/:id/posts", validateUserID, (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserID, (req, res) => {
  // do your magic!
});

router.put("/:id", validateUserID, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    return res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
