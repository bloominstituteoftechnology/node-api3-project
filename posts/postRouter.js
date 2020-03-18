const express = require('express');
const db = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
});

// custom middleware

function validatePostId(req, res, next) {

}

module.exports = router;
