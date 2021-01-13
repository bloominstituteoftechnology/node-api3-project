const express = require('express');
const Posts = require('./posts-model')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then((post) => {
    res.status(200).json(post)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send('oops! Something went wrong')
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.delete('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.put('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

// do not forget to export the router

module.exports = router