const express = require('express');

const express = require('express');
const validateUserId = require('../middleware/validateUserId')
const validateUser = require('../middleware/validateUser')
const validatePost = require('../middleware/validatePost')

const router = express.Router();

router.get('/', validateUser(), (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId(), (req, res) => {
  // do your magic!
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
