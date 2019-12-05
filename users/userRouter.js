const express = require('express');
const Utils = require('../MiddleWare/Utils')
const db = require('./userDb.js');

const postdb = require('../posts/postDb');

const router = express.Router();

router.post('/', Utils.validateUser, (req, res) => {
  // do your magic!
  const user = req.body;
  db.insert(user)
  .then((user)=>{
    res.status(200).json({user})
  })
  .catch(err=>{
    res.status(500).json({err})
  })
 
});

router.post('/:id/posts', Utils.validateUserId, Utils.validatePost, (req, res) => {
  // do your magic!

  const id = req.params.id;
  const post = req.body;
  
  postdb.insert(post)
  .then(post=>{

    db.getUserPosts(id)
    .then(posts=>{
      res.status(200).json({posts})
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then((users)=>{
    res.status(200).json({users})
  })
  .catch(err=>{
    res.status(500).json({err})
  })
});

router.get('/:id', Utils.validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  db.getById(id)
  .then((user)=>{
    res.status(200).json({user})
  })
  .catch((err)=>{
    res.status(500).json({err})
  })
});

router.get('/:id/posts', Utils.validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  db.getUserPosts(id)
  .then((posts)=>{
    res.status(200).json({posts})
  })
  .catch((err)=>{
    res.status(500).json({err})
  })
});

router.delete('/:id', Utils.validateUserId, (req, res) => {
  // do your magic!

  const id = req.params.id;

  db.remove(id)
  .then(d=>{
    res.status(200).json({message:"user deleted"})
  })
  .catch((err)=>{
    res.status(500).json({err})
  })
  
});

router.put('/:id', Utils.validateUserId, Utils.validateUser, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const user = req.body;
  db.update(id,user)
  .then((user)=>{
    res.status(200).json({user})
  })
  .catch(err=>{
    res.status(500).json({err})
  })

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
