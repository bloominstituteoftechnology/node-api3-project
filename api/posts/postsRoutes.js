const express = require("express");
// const Post = require("./postsModel");

const router = express.Router();

// server.use("/api/posts", postsModel);

// RETURN AN ARRAY WITH ALL THE USERS
router.get("/", () => {
  // Post.find(req.query)
  //   .then((users) => {
  //     // return User.get(users);
  //     console.log(users);
  //     res.status(200).json(users);
  //   })
  //   .catch((err) => {
  //     // console.log("efrr");
  //     res.status(500).json({
  //       message: "The user information could not be retrieved",
  //       err: err.message,
  //       stack: err.stack,
  //     });
  //   });
});

module.exports = router;
