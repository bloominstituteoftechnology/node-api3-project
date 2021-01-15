const express = require('express');
const users = require('./users-model')
const router = express.Router();
const { validateUserId, validateUser } = require('../middleware/middleware')


router.post('/', validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
  const newUser = req.body
  users.insert(newUser)
  .then((user) => {
    res.status(210).json(user)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({message:"error getting user data"})
  })
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

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  users.remove(req.params.id)
  .then(user => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'user not found' })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const changes = req.body
  users.update(req.params.id, changes)
  .then(user => {
    console.log('whats going on')
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'user not found' })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.post('/:id/posts', validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

// do not forget to export the router
module.exports = router