const express = require('express');
const Post = require('./postDb');
const middlewares = require('../middlewares');

const router = express.Router();

// custom middleware






// ENDPOINTS 
router.get('/', async (req, res) =>  {
  try { 
    const allUsers = await Post.get();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

router.get('/:id', middlewares.validatePostId, (req, res) => {
  res.status(200).json(req.post); 
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', middlewares.validateUserId, middlewares.validatePost, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const postObj = {
    text: text,
    user_id: id
  };
  try { 
    const newPost = await Post.insert(postObj);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});


module.exports = router;
