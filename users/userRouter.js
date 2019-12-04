const express = require('express');

const validatePost   = require('../middleware/validatePost')
const validateUserId = require('../middleware/validateUserId');
const validateUser   = require('../middleware/validateUser');

const router = express.Router();

const db = require('./userDb')


router.post('/', validateUser, (req, res) => {
  // do your magic!
  db.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Error adding the user." })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  db.insert(req.body)
  .then(post => {
    res.status(201).json({post})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Error adding post" })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  db.get(req.query)
  .then(get => {
    res.status.json({get})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Error retrieving users." })
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

//function validateUserId(req, res, next) {
  // do your magic!
//}

//function validateUser(req, res, next) {
  // do your magic!
//}

//function validatePost(req, res, next) {
  // do your magic!
//}

module.exports = router;
