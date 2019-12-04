const express = require('express');
const Utils = require('../MiddleWare/Utils')
const db = require('../users/userDb');

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

router.post('/:id/posts', (req, res) => {
  // do your magic!
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

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
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
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
