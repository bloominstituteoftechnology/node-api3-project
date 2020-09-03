const express = require('express');

const router = express.Router();

const Posts = require('./postDb');


router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then((posts) =>{
    res.status(200).json(posts);
  })
  .catch((err) => {
    res.status(500).json({error: 'Unable to retrieve posts'})
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
