const express = require('express');

const validateUserId = require('../middleware/validateUserId')
const validateUser = require('../middleware/validateUser')
const validatePost = require('../middleware/validatePost')

// const logger = require('../server')

const router = express.Router();

router.post('/', validateUser(), async (req, res) => {
  // do your magic!
  try {

  }
  catch (err) {

  }
});

router.post('/:id/posts', validatePost(), async (req, res) => {
  // do your magic!
  try {

  }
  catch (err) {

  }
});

router.get('/', validateUser(), async (req, res) => {
  // do your magic!
  try {

  }
  catch (err) {

  }
});

router.get('/:id', validateUserId(), async (req, res) => {
  // do your magic!
  try {

  }
  catch (err) {

  }
});

router.get('/:id/posts', validatePost(), async (req, res) => {
  // do your magic!
  try {

  }
  catch (err) {

  }
});

router.delete('/:id', validateUserId(), async (req, res) => {
  // do your magic!
  try {

  }
  catch (err) {

  }
});

router.put('/:id', validateUserId(), async (req, res) => {
  // do your magic!
  try {

  }
  catch(err) {

  }
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
