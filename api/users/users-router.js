const express = require('express');

const router = express.Router();
//get the middleware
const {logger,validateUserId,validateUser,validatePostId,validatePost}= require('../middleware/middleware');
//get the usermodel
const userModel=require('./users-model');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  console.log('validate user')
  // this needs a middleware to check that the request body is valid
   userModel.insert(req.body)
  .then(post=>{
    res.status(201).json(post)
  })
  .catch(err=>{
    res.status(500).json({message: err.message})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  userModel.get()
  .then(userList=>{
    res.status(200).json(userList)
  })
  .catch(err=>{
    res.status(500).json({message: "cannot get users"})
  })
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
    res.status(200).json(req.user)
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  if(req.user){
    userModel.remove(req.user.id)
    .then(deleted=>{
      res.status(200).json(deleted)
    })
    .catch(err=>{
      res.status(500).json({message: "something went wrong in delete"})
    })
  }
});
//not working! text field not updated 
router.put('/:id',validateUserId,validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  userModel.update(req.user.id,req.body)
  .then(updated=>{
    res.status(200).json(updated)
  })
  .catch(err=>{
    res.status(500).json({message: err.message})
  })
});

//should we post text ???? 
router.post('/:id/posts', validateUserId,validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  userModel.insert(req.body)
  .then(posted=>{
    res.status(201).json(posted)
  })
  .catch(err=>{
    res.status(500).json({message: err.message})
  })
 
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  userModel.getUserPosts(req.user.user_id)
  .then(userPost=>{
    res.status(201).json(userPost)
  })
  .catch(err=>{
    res.status(500).json({message: err})
  })
});

// do not forget to export the router
module.exports=router;