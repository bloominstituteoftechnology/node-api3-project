const express = require('express');
const Helpers = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

// router.use((req, res, next)=>{
//   console.log("in the users router!");
//   next()
// })

router.post('/',validateUser, (req, res) => {
 Helpers.insert(req.body)
 .then(user =>{
   res.status(201).json(user);
 })
 .catch(erro=>{
   res.status(500).json({message: 'Error adding user to database'})
 })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  console.log('req.body', req.body)
  const postInfo = {...req.body, user_id: req.params.id};
  Posts.insert(postInfo)
  .then(post =>{
    res.status(210).json(post);
  })
  .catch(error =>{
    res.status(500).json({message: 'error adding the post'})
  })
});

router.get('/', (req, res) => {
  
  Helpers.get()
  .then(users =>{
    res.status(200).json(users);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({message: 'error retrieving users'});
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Helpers.getUserPosts(req.params.id)
  .then(posts =>{
    res.status(200).json(posts);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({message: 'error retrieving post'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  Helpers.remove(req.params.id)
  .then(count =>{
    if(count >0) {
      res.status(200).json({message: "the user has been removed"});
    } else {
      res.status(404).json({ message: 'the user could not be found'});
    }
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({message: 'Error removing the user'})
  });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Helpers.update(req.params.id, req.body)
  .then(user=>{
    if(user){
    res.status(200).json(user);
  }else{
    res.status(404).json({message: "the user could not be found"});
  }
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json({ message: 'Error updating the user'});
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  Helpers.getById(id)
    .then(user =>{
      if(user){
        req.user = user;
        next();
      }else{
        res.status(400).json({message: 'invalid user id'});
      }
    })
}

function validateUser(req, res, next) {
  if(req.body && Object.keys(req.body).length <= 0){
    res.status(400).json({message: 'missing user data'})
  }else if(!req.body.name){
    res.status(400).json({message: 'missing required name field'})
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  if(req.body && Object.keys(req.body).length <= 0){
    res.status(400).json({message: 'missing user data'})
  }else if(!req.body.text) {
    res.status(400).json({message: 'missing required text field'})
  }else{
    next();
  }
}

module.exports = router;
