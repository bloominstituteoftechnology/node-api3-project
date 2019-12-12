const express = require('express');

const express = require('express');
const validateUserId = require('../middleware/validateUserId')
const validateUser = require('../middleware/validateUser')
const validatePost = require('../middleware/validatePost')

const router = express.Router();

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
  catch (err) {

  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = {
  router,
  validatePost,
  validateUser,
  validateUserId
}
