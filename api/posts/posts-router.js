const express = require('express');

const router = express.Router();

const mw = require('../middleware/middleware');

const Posts = require('../posts/posts-model')

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  try {
    const posts = await Posts.get()

    res.status(200).json(posts)
  } catch (error) {
    res.status(404).status(error.message)
  }
});

router.get('/:id', mw.validatePostId , async (req, res) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
  try {

    const getPost = await Posts.update(req.id, req.body)

    res.status(200).json(getPost)

  } catch (error) {
    res.status(404).json(error.message)
  }
});

// do not forget to export the router
module.exports = router;