const express = require('express');
const Post = require('./postDb');

const router = express.Router();

// custom middleware

const validatePostId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.getById(id); 
    if (!post) { 
      res.status(404).json({ message: `post with id of ${id} not found`});
    } else {
      req.post = post;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
}

const validatePost = (req, res, next) => {
  // do your magic!
}


// ENDPOINTS 
router.get('/', async (req, res) =>  {
  try { 
    const allUsers = await Post.get();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post); 
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});


module.exports = router;
