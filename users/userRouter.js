const express = require('express');

const router = express.Router();

const db = require('./userDb')
const postDB = require('../posts/postDb');

router.post('/', (req, res) => {
  // do your magic!
  db.insert(req.body)
  .then(user =>{
    res.status(200).json(user)
    console.log(user)
  })
  .catch(error =>{
    res.status(500).json({
      error: "The user was not added"
    })
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  postDB.update(req.params.id, req.body)
  .then(post =>{
    res.status(200).json(post)
    console.log(post)
  })
  .catch(error =>{
    res.status(500).json({
      error: "The post was not updated"
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(users =>{
      res.status(200).json(users)
    })
    .catch(error =>{
      res.status(500).json({
        error: "The user information could not be returned"
      })
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(error=>{
      res.status(500).json({
        error: "The user information could not be returned"
      })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  postDB.getById(req.params.id)
    .then(post =>{
      res.status(200).json(post)
    })
    .catch(error=>{
      res.status(500).json({
        error: "the post information could not be returned"
      })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  db.remove(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(error=>{
      res.status(500).json({
        error: "The user information could not be removed"
      })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
    .then(user =>{
      res.status(200).json(user)
      console.log(user)
    })
    .catch(error=>{
      res.status(500).json({
        error: "the user was not updated"
      })
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
