const express = require('express');

const router = express.Router();

const Posts = require('./postDb');


router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then((posts) =>{
    res.status(200).json(posts);
  })
  .catch((err) => {
    res.status(500).json({error: 'Unable to retrieve posts'})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then((post) =>{
    res.status(200).json(post);
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then((deletedPost) => {
    res.status(201).json({message: `deleted post with id: ${req.params.id}`})
  })
  .catch((err) =>{
    res.status(500).json({ error: 'error deleting post please try again'})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const postId = req.params.id;

  Posts.get(postsId)
  .then((post) => {
    if(post) {
      next();
    } else {
      res.status(404).json({message: 'unable to find post'})
    }
  })
  .catch((err) => {
    res.status(500).json({message: 'system cannot be reached'})
  })
}

module.exports = router;
