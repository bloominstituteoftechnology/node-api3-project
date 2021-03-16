const express = require('express');

const Users = require('./users-model.js')
const Posts = require('../posts/posts-model.js')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
const mw = require('../middleware/middleware')

router.get('/',mw.logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then(users =>{
    res.status(200).json(users)
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  });
});

router.get('/:id',mw.validateUserId, (req, res) => {
  res.status(200).json(req.user)
  // RETURN THE USER OBJECT
 
});

router.post('/',mw.validateUser, (req, res) => {
  Users.add(req.body)
  .then(user =>{
    res.status(201).json(user)
  })
  .catch(
    next()
  )
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',mw.validateUserId,mw.validatePost, (req, res) => {
  Users.update(req.params.id, req.body)
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  .then(user =>{
    res.status(200).json(user)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      message: 'Error updating posts'
    })
  })
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',mw.validateUserId,mw.validatePost, (req, res) => {
  const postInfo = {...req.body, user_id: req.params.id};

  Posts.add(postInfo)
  .then(post =>{
    res.status(210).json(post)
  })
  .catch(err =>{
    next(err)
  })
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});
router.use((err,req,res,next) =>{
  res.status(500).json({
    message:"something blew up",
    error:err.message
  })
})
  module.exports = router

