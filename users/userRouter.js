const express = require('express');

const router = express.Router();



router.post('/', (req, res) => {
  // do your magic!
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

  next()
}

function validateUser(req, res, next) {
  // do your magic!
  getById(id)
  next()
}

function validatePost(req, res, next) {
  // do your magic!

  next()
}

module.exports = router;
