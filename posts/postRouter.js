const express = require('express');
const Hubs = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Hubs
    .get(req.query)
    .then(hubs => {
      res.status(200).json(hubs)
    })
    .catch(error => {
      console.log(error.message, error.stack)
      res.status(500).json({
          message: error.message,
          stack: error.stack
      })
  })
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

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
