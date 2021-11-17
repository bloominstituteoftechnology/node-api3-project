const express = require('express');
const {logger, validateUserId, validateUser, validatePost }= require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, (req, res, next) => {
  Users.find();
  logger
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error =>{
    next(error)
  });
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', logger, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  res.json(req.user)
});

router.put('/:id', logger, validateUserId, validatePost, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  res.json(req.user)
});

router.delete('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  res.json(req.user)
});

// do not forget to export the router
module.exports = router;
