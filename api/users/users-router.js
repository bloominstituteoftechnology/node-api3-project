const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const {validateUserId} = require('../middleware/middleware');
const {validateUser} = require('../middleware/middleware');
const {validatePost} = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const user = req.body;
  try {
    const newUser = await Users.insert(user)
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const user = req.body;

  try {
    const updatedUser = await Users.update(req.user.id, user);
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const deletedUser = await Users.remove(req.user.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id

  try {
    const posts = await Posts.getById(req.user.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ Error: {err}});
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const post = req.body;

  try {
    const newPost = await Posts.insert(post);
    res.status(201).json(newPost);
  } catch (err) {
    console.log(post);
    res.status(500).json({ Error: {err}});
  }
});

// do not forget to export the router
module.exports = router;
