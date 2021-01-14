const express = require('express');
const users = require('./users-model')
const router = express.Router();
const { validateUserId } = require('../middleware/middleware')
router.post('/', (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then((users) => {
    console.log('users work')
    res.status(200).json(users)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({message:"error getting user data"})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  console.log('made it users')
  res.status(200).json(req.user) 
});

router.delete('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

router.put('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

// do not forget to export the router
module.exports = router