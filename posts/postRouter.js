const express = require('express');

const router = express.Router();
const Post =  require('./postDb')

router.get('/', (req, res) => {
  Post.get()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.message})
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
  const { id } =  req.params
  
}

module.exports = router;
