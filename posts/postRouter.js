const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

//gets list of posts
router.get('/', (req, res) => {
  // api/posts
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "failed to get posts"})
    })
});
//gets specific post
router.get('/:id', (req, res) => {
  // api/posts
  Posts.getById(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'error retrieving post'
      })
    })
});
//deletes specific post
router.delete('/:id', (req, res) => {
  // api/posts
  Posts.remove(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({errorMessage: "failed to delete"})
    })
});
//modifies specific post
router.put('/:id', (req, res) => {
  // api/posts
  Posts.update(req.params.id, req.body)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({
        message: "failed to update post"
      })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic
}

module.exports = router;
