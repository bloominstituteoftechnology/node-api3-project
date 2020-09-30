const express = require('express');

const {get,getById,getUserPosts,insert,update,remove} = require("./userDb")
const {insertPost} = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  console.log(req.body)
  insert(req.body)
  .then(res.status(200).json(req.body))
  .catch(err  => {
    console.log(err)
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  insertPost(req.body)
  .then(res.status(200).json(req.body))
  .catch(err => {
    console.log(err)
  })
});

router.get('/', (req, res) => {
  get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  getById(Number(req.params.id))
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
  })
});

router.get('/:id/posts', validateUserId,(req, res) => {
  getUserPosts(Number(req.params.id))
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
  })
});

router.delete('/:id', validateUserId,(req, res) => {
  remove(Number(req.params.id))
  .then(res.status(200).json({message: "user has been deleted"}))
  .catch(err => {
    console.log(err)
  })
});

router.put('/:id', validateUserId,(req, res) => {
  update(Number(req.params.id), req.body)
  .then(res.status(200).json(req.body))
  .catch(err => {
    console.log(err)
  })
});

//custom middleware

function validateUserId(req, res, next) {
  console.log(req.params.id)
  getById(Number(req.params.id))
  .then(user => {
    if(!user){
      res.status(400).json({message: "no user found with that id"})
    } else{
      next()
    }
  })
  
}

function validateUser(req, res, next) {
  // console.log(req.body)
  if (!req.body.name) {
    res.status(400).json({message: "missing name"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body.text){
    res.status(400).json({message: "NO TEXT"})
  } else if(!req.body.user_id) {
    res.status(400).json({message: "NO ID"})
  } else {
    next()
  }
}

module.exports = router;