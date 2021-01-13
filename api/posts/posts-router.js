const express = require('express');
const Post = require('./posts-model');
const { 
  validatePostId,
  serverErrorHandler
 } = require('../middleware/middleware');

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

// curl -X GET http://localhost:5000/api/posts/:id
router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(res.post);
});

router.delete('/:id', validatePostId, async (req, res, next) => {
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