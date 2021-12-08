const express = require('express');
const Users = require('./users-model');
const {
  validateUserId,
  validateUser,
  validatePost} = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({message: err.message})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try{
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  }catch (err){
    res.status(500).json({message: 'Something went wrong'})
  }
});

router.put('/:id', validateUser,  validateUserId, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const changes = req.body
  const {id} = req.params
  const updatedUser = await Users.update(id, changes)
  res.status(201).json(updatedUser)
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try{
    const user = await Users.getById(req.params.id)
    res.status(200).json(user)
  }catch(err){
    res.status(500).json({message: 'something went wrong'})
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const {id} = req.params
  Users.getUserPosts(id)
  .then(messages => {
    res.status(200).json(messages)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting the posts for the user'})
  })
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;