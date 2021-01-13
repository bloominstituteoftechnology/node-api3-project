const express = require('express');
const Post = require('./posts-model');
const { 
  validatePostId,
  validatePost,
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

// curl -X DELETE http://localhost:5000/api/posts/:id
router.delete('/:id', validatePostId, async (req, res, next) => {
  try {
    await Post.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// curl -d '{"text": "some random text"}' -H 'Content-Type: application/json' -X PUT http://localhost:5000/api/posts/:id
router.put('/:id', validatePostId, validatePost, async (req, res, next) => {
  const id = req.params.id;
  const postContent = req.body;
  try {
    await Post.update(id, postContent);
    const updatedPost = await Post.getById(id);
    res.status(201).json(updatedPost);
  } catch (err) {
    next(err);
  }
});

router.use(serverErrorHandler);

// do not forget to export the router
module.exports = router;