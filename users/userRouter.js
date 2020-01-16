const express = require('express');
const users= require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      res.status(500).json({error: 'could not add user'})
    })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  users.get(req.body)
    .then(user=>{
      res.status(200).json(user)
    })
    .catch(err=>{
      res.status(500).json({error: 'could not fetch users'})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  console.log(req.params.id)
  users.getById(req.params.id)
    .then(user=>{
      res.status(200).json(user)
    })
    .catch(err=>{
      res.status(500).json({error: 'could not find user'})
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    .then(user=>{
      res.status(200).json({message: `user ${req.params.id} deleted`})
    })
    .catch(err=>{
      res.status(500).json({error: 'there was an error deleting that user'})
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
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
