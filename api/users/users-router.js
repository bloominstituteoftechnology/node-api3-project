const express = require('express');
const users = require("./users-model")
const posts = require("../posts/posts-model")
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId(), (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId(), (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  
});

router.post('/:id/posts', validateUserId(), (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  
  // and another middleware to check that the request body is valid
});

module.exports = router
