const express = require('express');
const User = require('./users-model');
const { 
  validateUserId,
  validateUser,
  serverErrorHandler
} = require('../middleware/middleware');

const router = express.Router();

// curl -d '{"name": "my name"}' -H 'Content-Type: application/json' -X POST http://localhost:5000/api/users
router.post('/', validateUser, async (req, res, next) => {
  const user = req.body;
  try {
    const newUser = await User.insert(user);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
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

// curl -X GET http://localhost:5000/api/users/:id
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(res.user);
});

// curl -X DELETE http://localhost:5000/api/users/:id
router.delete('/:id', validateUserId, async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.remove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
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