const express = require('express');

const Hubs = require('./postDb');

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
  // do your magic!
});

// custom middleware

function validatePost(req, res, next) {
  const body = req.body;

  if (!body || body === {}) {
    res.status(400).json({ message: 'Missing post data!' })
  }
}

module.exports = router;
