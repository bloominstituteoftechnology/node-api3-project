const express = require('express');

const validateUserId = require('../middleware/validateUserId')
const validateUser = require('../middleware/validateUser')
const validatePost = require('../middleware/validatePost')

// const logger = require('../server')

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validatePost(), (req, res) => {
  // do your magic!
});

router.get('/', validateUser(), (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validatePost(), (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = {
  router,
  validatePost,
  validateUser,
  validateUserId
}
