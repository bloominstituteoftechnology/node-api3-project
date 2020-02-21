const express = require('express');
const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  postDb.getById(req.params.id)
  .then(p => {
    if (p) {
      req.post = p;
      next();
    } else {
      res.status(400).json({
        message: "invalid post id"
      })
    }
  })
  .catch(() => {
    res.status(500).json({
      message: "error retrieving the post id"
    })
  })
}

module.exports = router;
