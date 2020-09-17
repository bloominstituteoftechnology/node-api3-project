const express = require("express");
const {
  validateUserId,
  validatePostData,
  validateUserData,
} = require("../middleware/userMiddleware");
const { remove } = require("./userDb");
const users = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUserData(), (req, res) => {
  // Create new user
  // Validate the user info  that was just created
  const insertUser = users.insert(req.body);

  insertUser
    .then((newUser) => {
      if (newUser) {
        res.status(201).json({
          message: "You have successfully added a new user",
          new_user: newUser,
        });
      } else {
        res.status(500).json({
          message: "Something went wrong adding the user to the database",
        });
      }
    })
    .catch((err) => {
      next();
    });
});

router.post("/:id/posts", validateUserId(), validatePostData(), (req, res) => {
  // What needs to happen in order to post a succesful post
  // Validate th user exist
  // if they exist then I need to grab the post data and make sure that it is valid
  // const postData = req.upgradedPost;
  // const addPost = users.insert(req.upgradedPost);
  console.log(" I am the value of req.body in the router", req.upgradedPost);
  posts
    .insert(req.upgradedPost)
    .then((newPost) => {
      console.log("I am the new post", newPost);
      res.status(200).json(newPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: `error posting new post to user id ${req.params.id}`,
        message: err,
      });
    });
});

router.get("/", (req, res) => {
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

module.exports = router;
