const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model.js");
const Posts = require("../posts/posts-model");
// const Posts = require("../posts/posts-model");
// The middleware functions also need to be required
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware.js");

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users!",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  Users.getById(id);
  res.status(200).json(req.user);
});

router.post("/", validateUser, validatePost, (req, res) => {
  const newUser = req.body;
  Users.insert(newUser);
  res.status(201).json(newUser);
});

// RETURN THE FRESHLY UPDATED USER OBJECT
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.put("/:id", validateUser, validateUserId, async (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  const updatedUser = await Users.update(id, changes);

  res.status(201).json(updatedUser);
});

// RETURN THE FRESHLY DELETED USER OBJECT
// this needs a middleware to verify user id
router.delete("/:id", validateUserId, async (req, res) => {
  const { id } = req.params;
  const deletedUser = await Users.remove(id);
  res.status(201).json(deletedUser);

  // Users.remove(id)
  //   .then(() => {
  //     res.status(201).json({ message: "The user has been removed" });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).json({
  //       message: "Error removing the user",
  //     });
  //   });
});

// RETURN THE ARRAY OF USER POSTS
// this needs a middleware to verify user id
router.get("/:id/posts", (req, res) => {
  // const userPosts = {...req.body, userId: req.params.id}
  Users.getUserPosts(req.params.id)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving user posts",
      });
    });
});

// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  const updatedPost = await Posts.insert({
    user_id: req.params.id,
    text: req.body.text,
  });
  res.status(201).json(updatedPost);

  // if (!newPost) {
  //   res.status(404).json("User post not found ");
  // } else {
  //   Users.insert(newPost)
  //     .then((user) => {
  //       res.status(201).json(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(500).json({
  //         message: error.message,
  //       });
  //     });
  // }
});

// do not forget to export the router

module.exports = router;
