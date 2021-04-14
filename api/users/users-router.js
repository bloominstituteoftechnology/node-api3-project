const express = require('express');
const users = require("./users-model")
const posts = require("../posts/posts-model")

const {validateUserId, validateUser, validatePost} = require("../middleware/middleware")

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
    .then(success => {
      res.json(success)
    })
    .catch(() => {
      res.status(500).json({message: "error retrieving users"})
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
    .then(success => {
      res.status(200).json(success)
    })
    .catch(next)

});

router.put('/:id', validateUser(), validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.params.id, req.body)
    .then(success => {
      res.status(200).json(success)
    })
    .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
    .then(() => {
      res.status(200).json({message: "The user has been deleted!"})
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users.getUserPosts(req.params.id)
    .then(success => {
      res.status(200).json(success)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const user_id = req.params.id
  const newPost = {...req.body, user_id: user_id }
  posts.insert(newPost)
    .then(success => {
      res.status(200).json(success)
    })
    .catch(next)
});

// do not forget to export the router

module.exports = router