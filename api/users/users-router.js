const express = require('express');
const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(users => res.json(users))
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.users);
});

router.post('/',validateUser, (req, res,next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({name:req.name})
  .then(newUser =>
    res.status(201).json(newUser))
  .catch(next)
});

router.put('/:id', validateUserId,validateUser, (req, res,next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, {name: req.name})
  .then(updatedUser =>{
    res.json(updatedUser)
  })
  .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
  .then(removedUser =>{
    res.json(removedUser)
  })
  .catch(next)
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try{
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  }
  catch (err){
    next(err)
  }

});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try{
    const result = await Post.insert({
      user_id : req.params.id,
      text: req.text
    })
    res.status(201).json(result)
  }catch(err){
    next(err)
  }

});
router.use((err,req,res,next)=>{
  res.status(err.status || 500).json({
    customMessage:'something bad happened ...',
    message: err.message,
    stack:err.stack,
  })
})
// do not forget to export the router
module.exports = router