const express = require('express');

const router = express.Router();

const Posts = require('./posts-model');

const { validatePostId, validatePost } = require('../middleware/middleware')

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.'})
    });
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ messag: 'Server side error.' });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'Post deleted.' });
      } else {
        res.status(400).json({ message: 'Post not found.' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.put('/:id', [validatePostId, validatePost], (req, res) => {
  const { id } = req.params;
  Posts.update(id, req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

// do not forget to export the router
module.exports = router;