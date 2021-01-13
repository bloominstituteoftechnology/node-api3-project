const express = require('express');
const User = require('./users-model');
const { 
  validateUserId,
  validateUser,
  serverErrorHandler
} = require('../middleware/middleware');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
});

// curl -X GET http://localhost:5000/api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

router.use(serverErrorHandler);

// do not forget to export the router
module.exports = router;