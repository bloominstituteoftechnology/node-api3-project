const express = require('express');

const Posts = require('./posts-model');
const middleware = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
});

router.get('/:id', middleware.validatePost, (req, res) => {
  res.status(200).json(req.post);
});

module.exports = router;
