const express = require('express');
const users = require("./users-model")
const posts = require('../posts/posts-model')
const {
  logger,
  validateUserId,
  validateUser,
  validatePost
} = require("../middleware/middleware")

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/users', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser(), (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users
    .add(req.body)
    .then(user => res.status(200).json(user))
    .catch(error => next(error))
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user could not be found"
        })
      }
    })
    .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.user.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} users have been deleted`
        })
      } else {
        res.status(404).json({
          message: "The user could not be found"
        })
      }
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  if (!req.user.posts) {
    res.status(404).json({
      message: "User does not have any posts"
    })
  } else {
    res.status(200).json(req.user.posts)
  }
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  if (!req.body.text) {
    return res.status(400).json({
      message: "Need a value for text"
    })
  }

  posts.insert(req.params.id, req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(next)
});

// do not forget to export the router
module.exports = router