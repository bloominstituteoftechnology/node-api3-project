const express = require("express");
const router = express.Router();

const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const User = require("./users-model");
const Post = require("../posts/posts-model");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post("/", validateUser, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({ name: req.name })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, { name: req.name })
    .then(() => {
      return User.getById(req.params.id);
    })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    await User.remove(req.params.id);
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const posts = await User.getUserPosts(req.params.id);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  validateUserId,
  validatePost,
  async (req, res, next) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    try {
      const result = await Post.insert({
        user_id: req.params.id,
        text: req.text,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

//Error handler
//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something tragic occured",
    message: err.message,
    stack: err.stack,
  });
});

// do not forget to export the router

module.exports = router;
