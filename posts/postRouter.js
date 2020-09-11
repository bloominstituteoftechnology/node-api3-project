const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts);
    console.log("Posts from get", Posts)
  })
  .catch(error => {
    next(error);
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
  .then(post => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found'})
    }
  })
  .catch(error => {
    next(error);
  })
});

router.delete('/:id', validatePostId, (req, res, next) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(count => {
    if(count === 0){
      res.status(404).json({
        message: 'The specified ID does not exist'
      })
    } else {
      res.status(200).json(count);
    }
  })
  .catch(error => {
    next(error);
  })
});

router.put('/:id', validatePostId, (req, res, next) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found'})
    }
  })
  .catch(error => {
    next(error);
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Posts.getById(id)
  .then(post => {
    if(post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: 'Invalid post id' });
    }
  })
  .catch(error => {
    next(error);
  })
}

module.exports = router;
