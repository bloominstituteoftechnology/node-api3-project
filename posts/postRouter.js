const express = require('express');
const db = require('./postDb')
const router = express.Router();

router.use("/:id", validatePostId)

router.get('/', (req, res) => {
  
  db.get().
  then(data => {
    res.status(200).json(data)
  })
  .catch(err => res.status(500).json({message: "Server Error"}))

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
  db.getById(req.params.id)
  .then(data => {
    if (!data) {
      res.status(400).json({message: "invalid post id"})
    } else {
      req.post = data;
      next();
    }
  }).catch(res.status(500).json({message: "internal server error"}))
}

module.exports = router;
