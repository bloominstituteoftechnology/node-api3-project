const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

// The middleware functions also need to be required
const {validateUserId,validateUser,validatePost } = require('../../api/middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Unable to retrieve users',
      });
    });
});

router.get('/:id',validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/',validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',validateUserId,validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id,req.body)
    .then(res.status(200).json(req.body))
    .catch(() => {res.status(500).json({message: 'error updating user'})})
});

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(res.status(200).json({message: 'successful delete'}))
    .catch((err) => {
      res.status(500).json({message: err})
    })
  
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    }).catch(()=> {
      res.status(500).json({message: 'error getting user posts'})
    })
});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.insert(req.body)
    .then(res.status(202).json(req.body))
    .catch(()=> {
      res.status(500).json({message: 'error creating new user object'})
    })
});

// do not forget to export the router
module.exports = router;
