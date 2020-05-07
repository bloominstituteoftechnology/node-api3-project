const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:postid', (req, res) => {
  // do your magic!
});

router.delete('/:postid', (req, res) => {
  // do your magic!
});

router.put('/:postid', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
