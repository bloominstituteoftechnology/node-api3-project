const express = require("express");
const validateUserID = require("./validateUserIdMW");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", validateUserID, (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware 2!</h2>`);
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

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
