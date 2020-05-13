const express = require('express');

const users = require('./userDb')
const posts = require('../posts/postDb');

const router = express.Router();

router.use(express.json())
router.use('/:id' , validateUserId)


router.post('/', (req, res) => {
  // do your magic!
  users.insert(req.body)
  .then(item => {
    res.status.json(item)
  }).catch(err => {
    res.status(500).json(() => {
      message:"server error"
    })
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
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

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
