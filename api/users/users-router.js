const express = require('express');
const Users = require("./users-model")
const Post = require("../posts/posts-model")
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const {
  validateUserId,
  validateUser,
  validatePost
} = require("../middleware/middleware")
const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: err.message})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/',validateUser,async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try{
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
});

router.put('/:id',validateUser, validatePost, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params
  const changes = req.body

  const updateUser = await Users.update(id, changes)
  res.status(201).json(updateUser)
});

router.delete('/:id',validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params
  
  const deletedUser = await Users.remove(id)
  res.status(200).json(deletedUser)
  
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params
  
  Users.getUserPosts(id)
    .then(post => {
    res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
});

router.post('/:id/posts', validateUserId (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid


});

// do not forget to export the router
module.exports = router;