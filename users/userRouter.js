const express = require('express');
const db = require('./userDb')
const postDb = require('../posts/postDb')
// const postRouter = require('./posts/postRouter')

const router = express.Router();

router.post('/', validateUser,(req, res) => {
  // do your magic!
  const user = req.body
  db.insert(user)
  .then(user => res.status(200).json(user)
  .catch(err => res.status(500).json({message:"error posting"}))
  )
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const {id} = req.params
  const post= req.body
  console.log(post)
  post.user_id = id
  console.log(post)
  postDb.insert(post)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json({message:"error connecting to server"}))

}); 

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json({message:"error connecting to server"}))
});

router.get('/:id',validateUserId, (req, res) => {
  const {id} = req.params
  db.getById(id)
    .then(userid => res.status(200).json(userid))
    .catch(err => res.status(400).json({message:"error connecting to server"}))
  // do your magic!
});

router.get('/:id/posts', validateUserId,(req, res) => {
  const {id} = req.params
  db.getUserPosts(id)
  .then(posts => res.status(200).json(posts))
  .catch(err => res.status(400).json({message:"error connecting to server"}))
  // do your magic!
});

router.delete('/:id', validateUserId,(req, res) => {
  // do your magic!
  const {id} = req.params
  db.remove(id)
    .then(deleted => res.status(202).json(deleted))
    .catch(err => res.status(400).json({message:"error connecting to server"}))
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  const changes = req.body;

  db.update(id,changes)
    .then(changed =>res.status(200).json(changed))
    .catch(err => res.status(400).json({message:"nope"})) 
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const{id} = req.params

  db.getById(id)
    .then( found => found.id == id && next())
    .catch(err =>res.status(400).json({message:"id not found"}))
}

function validateUser(req, res, next) { 
  // do your magic!
  const post = req.body

  if(post.name !== undefined){
    next()
  }else if(post !== undefined){
    res.status(400).json({message:"add a name field"})
  }else{
    res.status(500).json({message:"no Body"})
  }

}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body

  if(post.text !== undefined){
    next()
  }else if(post !== undefined){
    res.status(400).json({message:"add a name field"})
  }else{
    res.status(500).json({message:"no Body"})
  }
}

module.exports = router;
