const express = require('express');

const Posts = require('./postDb');

const router = express.Router({
  mergeParams: true
});

router.get('/', (req, res) => {
  Posts
  .get()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(404).json({ errorMessage: 'error retrieving posts' })
  })
});

router.get('/:id', validatePostId(), (req, res) => {
  const { id } = req.params;
  Posts
  .getById(id)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'could not find post with this ID' })
  })
});

router.delete('/:id', validatePostId(), (req, res) => {
  Posts
  .remove(req.params.id)
  .then(removed => {
    res.status(200).json({ message: 'post has been removed' })
  })
  .catch(err => {
    res.status(404).json({ message: 'could not delete this post by ID' })
  })
});

router.put('/:id', validatePostId(), validatePost(), (req, res) => {
  Posts
  .update(req.params.id, req.body)
  .then(post => {
    res.status(201).json({ message: 'post has been updated by ID' })
  }).catch()
});

// custom middleware

function validatePostId() {
  // do your magic!
  return (req, res, next) => {
    const { id } = req.params;
    Posts.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'invalid post id' })
      }
    })
    .catch(err  => {
      res.status(500).json({ error: 'The post information could not be retrieved'})
    })
  }
};

function validatePost() {
  return (req, res, next) => {
    resource = {
      text: req.body.text
    };
    if (!resource.text) {
      res.status(400).json({ message: 'missing post text field' })
    } else {
      req.text = resource;
      next();
      // res.status(400).json({ message: 'missing required text field' })
    }
  }
}


module.exports = router;
