const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to our API for project 3"
  });
});

module.exports = router;
