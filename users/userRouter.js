const express = require('express');

const UserDb = require('./userDb')
const dbConfig = require('../data/dbConfig') 
const router = express.Router();
const PostDb = require('../posts/postDb')

router.post('/', (req, res) => {
  // do your magic!
  UserDb.insert(req.body)
  .then(user => {
    res.send(201).json(user)
  })
  .catch(err => {
    console.log(err)
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  PostDb.insert(req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err)
  })
});

router.get('/', (req, res) => {
  // do your magic!
  UserDb.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  UserDb.getUserPosts(req.user.id)
  .then(posts => {
    res.status(200).json(posts)
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  UserDb.getById(req.params.id)
    .then(user=>{
      if(user){
        req.user = user
        next()
      } else {
        res.status(400).json({ message: 'invalid user id'})
      }
    })
}

function validateUser(req, res, next) {
  // do your magic!
  const empty = {}
  if(Object.keys(req.body).length > 0){
    console.log('body', Object.keys(req.body).length)
    if(req.body.name){
      next()
    } else {
      res.status(400).json({message: 'missing required name field', body: req.body })
    }
  } else {
    res.status(400).json({message: 'missing user data', body: req.body})
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(Object.keys(req.body).length > 0){
    if(req.body.text){
      next()
    } else {
      res.status(400).json({ message: 'missing required text field' })
    }
  } else{
    res.status(400).json({ message: 'missing post data' })
  }
}

module.exports = router;
