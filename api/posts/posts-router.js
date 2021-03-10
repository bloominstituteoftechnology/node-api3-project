const express = require("express");
const Post = require("./posts-model");
const mw = require("../middleware/middleware");
const router = express.Router();

router.get("/", mw.logger, (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  Post.get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", mw.validateUserId, mw.logger, (req, res, next) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
  next();
});

router.use((err, req, res) => {
  res.status(500).json({
    message: " Posts server error!!!",
    error: err.message,
  });
});

// do not forget to export the router
module.exports = router;
