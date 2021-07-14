/* eslint-disable */
const express = require("express");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const router = express.Router();

// router.get("/", validateUserId, (req, res) => {
// RETURN AN ARRAY WITH ALL THE USERS
// console.log(req.user);
// });

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  //   User.findById(req.params.id)
  //     .then((user) => {
  //       if (user) {
  //         res.status(200).json(user);
  //       } else {
  //         res.status(404).json({
  //           message: "The user with the specified ID does not exist",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({
  //         message: "The post information could not be retrieved",
  //         err: err.message,
  //         stack: err.stack,
  //       });
  //     });
});

router.post("/", validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log(req.name);
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.name);
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.text);
});

// do not forget to export the router
module.exports = router;
