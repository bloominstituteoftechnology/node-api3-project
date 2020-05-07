const express = require('express');

const router = express.Router();
const Users = require("./userDb")
const Posts = require("../posts/postDb")

router.post('/',validateUser, (req, res) => {
  // do your magic!
  Users.insert({name:req.body.name})
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({error: "Error while creating a new user"})
    })
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  // do your magic!
  Posts.insert({...req.body,user_id:req.user.id})
    .then(post=>{
      console.log(post)
      res.status(201).json(post)
    })
  
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then((users)=>{
        res.status(201).json(users)
    })
    .catch(()=>{
      res.status(500).json({error:"Could not get list of users"})
    })
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(()=>{
      res.status(500).json({error:"Error finding user data"})
    })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(201).json(posts)
  })
  .catch(()=>{
    res.status(500).json({error:"Error finding users post data"})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(()=> {
      res.status(200).json({message:"User Deleted"})
    })

  .catch(()=>{
      res.status(500).json({error:"Error Deleting User"})
    })
  
});

router.put('/:id',validateUserId,validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id,req.body)
    .then(()=> {
      res.status(200).json({message:"User updated"})
    })

  .catch(()=>{
      res.status(500).json({error:"Error Updating User"})
    })
});

//custom middleware

function validateUserId(req, res, next) {

  // do your magic!
  Users.getById(req.params.id)
    .then((response)=>{
      if(response){
        req.user = response;
        next();
      } else {
        res.status(400).json({message: "invalid user id"})
      }
    })
    .catch((err)=>{
      res.status(500).json({error: "There was a problem finding the user ID"})
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body){
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text){
    res.status(400).json({message: "missing required text field"})
  } else {
    next();
  }
}

module.exports = router;
