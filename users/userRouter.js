const express = require('express');
const Helpers = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.use((req, res, next)=>{
  console.log("in the users router!");
  next()
})

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
  Posts.getById(req.params.id)
  .then(posts =>{
    res.status(200).json(posts);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({message: 'error retrieving post'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
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
        next({message: 'invalid user id'});
      }
    })
}

function validateUser(req, res, next) {
  if(req.body && Object.keys(req.body).length > 0){
    next();
  }else{
    res.status(400).json({message: 'missing post data'})
  }
}

function validatePost(req, res, next) {
  if(req.body.text) {
    next();
  }else{
    res.status(400).json({message: 'missing required text field'})
  }
}

module.exports = router;
