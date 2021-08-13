const express = require('express');
const Users = require('./users-model')
const Post = require('./../posts/posts-model')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
// const {logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')
const router = express.Router();

router.get('/',  (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Error recieving message'})
      })
});

router.get('/:id',  (req, res) => {
  // RETURN THE USER OBJECT
  Users.getById(req.params.id)
       .then(user => {
         if (user) {
           res.status(200).json(user)
         } else {
           res.status(404).json({message:'the id is not found'})
         }
       })
  // this needs a middleware to verify user id
  
  // console.log('Working')
});

router.post('/',  (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  
  Users.insert(res.body)
       .then(user => {
         res.status(200).json(user)
       })
       .catch(err => {
         console.log(err)
         res.status(500).json({message: 'Could not update user'})
         
       })
       // this needs a middleware to check that the request body is valid
});

router.put('/:id', async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  const {id} = req.params
  const changes = req.body

  try{
    if (!changes.name || !changes.text){
      res.status(400).json({message: 'Please provide Name and Text for post '})
    } else {
      const updateInfo = await Users.update(id, changes)
      if(!updateInfo){
        res.status(404).json({message:"User with id doesn't exsit"})
      } else {
        res.status(200).json(updateInfo)
      }
    }
    const updateInfo = await Users.update(id, changes)
      res.status(200).json(updateInfo)
  }

  catch(err){
    res.status(500).json({message:err.message})
  }
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
       .then(() =>{
         res.status(201).json(Users)
       })
       .catch(err => {
         console.log(err)
         res.status(500).json({message:'Error removing hub'})
       })
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
      .then(posts => {
        if (posts){
          res.status(200).json(posts)
      }else {
        res.status(404).json({message:"The post with the specified ID does not exist" })
      }
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
  const newPostInfo = { ...req.body, user_id: req.params.id  }
  
  Post.insert(newPostInfo)
      .then(posts => {
        res.status(210).json(posts)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Error returning the new post'})
      })
});

// do not forget to export the router
module.exports = router

