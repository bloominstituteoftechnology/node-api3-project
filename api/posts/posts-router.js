const express = require('express');
const Post = require('./posts-model');
const { serverErrorHandler } = require('../middleware/middleware');

const router = express.Router();

// curl -X GET http://localhost:5000/api/posts/
router.get('/', async (req, res, next) => {
  try {
    const allPosts = await Post.get();
    res.status(200).json(allPosts);
  } catch (err) {
    next(err);
  }
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

router.use(serverErrorHandler);

// do not forget to export the router
module.exports = router;