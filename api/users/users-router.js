const express = require('express');
const users = require('./users-model')
const post = require('./../posts/posts-model')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const {logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')
const router = express.Router();

router.get('/', logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get(req.query)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json({message: 'Error recieving message'})
      })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
  console.log('Working')
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(res.body)
       .then(user => {
         res.status(200).json(user)
       })
       .catch(err => {
         console.log(err)
         res.status(500).json({message: 'Could not update user'})
         
       })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
       .then(() =>{
         res.status(201).json(users)
       })
       .catch(err => {
         console.log(err)
         res.status(500).json({message:'Error removing hub'})
       })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  post.getUserPosts(req.params.id)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message:'couldnt retrieve users posts'})
      })
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const newPostI = {...req.body, id: req.params.id}
  post.insert(newPostI)
      .then(posts => {
        res.status(201).json(posts)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Error returning the new post'})
      })
});

// do not forget to export the router
module.exports = router

