const express = require('express');
const Helpers = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
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
