const express = require('express');
// const User = require('../users/users-model')
// const Posts = require('../posts/posts-model')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.name);
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.name);
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.text);
});

// do not forget to export the router
module.exports = router