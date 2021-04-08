const express = require('express');

const users = require('./users-model.js')
const posts = require('../posts/posts-model.js')

const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware.js')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
    .then( users => {
      res.status(200).json(users)
    })
    .catch( error => {
      res.status(500).json({message: 'Server error', error})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJET
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const { name } = req.body
  users.insert({name})
    .then( newUser => {
      res.status(201).json(newUser)
    })
    .catch( error => {
      res.status(500).json({message: 'Server Error', error})
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { name } = req.body
  users.update(req.params.id, { name })
    .then( user => {
      res.status(200).json(user)
    })
    .catch( error => {
      res.status(500).json({message: 'Server Error', error})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
    .then( () => {
      res.status(200).json(req.user)
    })
    .catch( error => {
      res.status(500).json({message: 'Server Error', error})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
    .then( posts => {
      res.status(200).json(posts)
    })
    .catch( error => {
      res.status(500).json({message: 'Server Error', error})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { text } = req.body
  const { id: user_id } = req.params

  posts.insert({text, user_id})
    .then( newPost => {
      res.status(201).json(newPost)
    })
    .catch( error => {
      res.status(500).json({message: 'Server Error', error})
    })
});

// do not forget to export the router
module.exports = router