const express = require('express');
const users = require("./users-model")
const posts = require("../posts/posts-model")
const { validateUserId, validateUser } = require("../middleware/middleware")
// The middleware functions also need to be required

const router = express.Router();

router.get('/users', (req, res, next) => {
  users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get('/users/:id', validateUserId(), (req, res, next) => {
  res.status(200).json(req.user)
});

router.post('/users', validateUser(), (req, res, next) => {
  users.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
});

router.put('/users/:id', validateUserId(), validateUser(), (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  users.update(req.params.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  
});

router.post('/:id/posts', validateUserId(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  
  // and another middleware to check that the request body is valid
});

module.exports = router
