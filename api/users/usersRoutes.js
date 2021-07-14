/* eslint-disable */

const express = require("express");
const postsModel = require("./posts/postsModel");
const usersModel = require("./posts/usersModel");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const router = express.Router();
const server = express();
server.use(express.json());

const User = require("./usersModel");
const Post = require("./postsModel");

server.use("/api/posts", postsModel);
server.use("/api/users", usersModel);

// RETURN AN ARRAY WITH ALL THE USERS
router.get("/", (req, res) => {
  User.get(req.query)
    .then((users) => {
      // return User.get(users);
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      // console.log("efrr");
      res.status(500).json({
        message: "The user information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.get("/:id", (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.post("/", (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
