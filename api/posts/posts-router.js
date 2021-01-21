const express = require('express');

const router = express.Router();
const postsModel = require('./posts-model');

const { validatePostId, validatePost } = require('../middleware/middleware');

router.get('/', async (req, res) => {
  const posts = await postsModel.get()

  try {
    if (posts) {
      res.status(200).json(posts)
    } else {
      res.status(400).json("No Post Found")
    }
  }
  catch(err) {
    res.status(500).json({ Error: err.message })
  }
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, async (req, res) => {

  try {
    const deletedPost = await postsModel.remove(req.post.id)
    if(deletedPost === 1){
      res.status(200).json(deletedPost)
    } else {
      res.status(400).json({ message: "Unable to delete post"})
    }
  } catch(err) {
    res.status(500).json({ Error: err.message })
  }
});

router.put('/:id', validatePostId, validatePost, async (req, res) => {
  
  try {
    const update = await postsModel.update(req.post.id, req.body)
    res.status(200).json(update)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

module.exports=router;