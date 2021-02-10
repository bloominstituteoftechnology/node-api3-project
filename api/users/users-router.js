const express = require('express');

const Users = require('./users-model');
const middleware = require('../middleware/middleware')

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE USERS
router.get('/', (req, res) => {
  Users.get(req.query)
  .then((users) =>{
    res.status(200).json(users);
  })
  .catch((error) =>{
    res.status(500).json({message: 'Error retrieving Users'})
  })
});

router.get('/:id', middleware.validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', middleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',middleware.validateUserId, middleware.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
