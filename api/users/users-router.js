const express = require('express');

const Users = require('./users-model.js')
const Posts = require('../posts/posts-model.js')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const { validateUserId, validateUser, validatePost } = require("../middleware/middleware.js")

const router = express.Router();

router.get('/', (req, res) => {
  Users.get(req.query)
  .then(users=>{
    res.status(200).json(users)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({
      message: "error retrieving the users"
    })
  })
});

router.get('/:id',validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/',validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      res.status(400).json(message.err)
    })
});

router.put('/:id',validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router