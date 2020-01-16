const express = require('express');
const posts= require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts.get(req.body)
    .then(post=>{
      res.status(200).json(posts)
    })
    .catch(err=>{
      res.status(500).json({error: 'the posts could not be fetched'})
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
