/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the posts', error,
      });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the post', error,
      });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'The POST has been deleted' });
      } else {
        res.status(404).json({ message: 'The POST could not be found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error removing the POST', error });
    });
});


router.put('/:id', [validatePost, validatePostId], (req, res) => {
  const { id } = req.params;

  Posts.update(id, req.body)
    .then(() => {
      res.status(200).json({ success: 'Info Updated!', info: req.body });
    })
    .catch((err) => {
      res.status(500).json({ error: 'I cannot provide any info from the inner server, try again!', err });
    });
});

// custom middleware
function validatePost(req, res, next) {
  const { text } = req.body;

  Object.entries(req.body).length === 0
    ? res.status(400).json({ message: 'No User Data' })
    : !text
      ? res.status(400).json({ message: 'Missing required name field' })
      : next();
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: 'Invalid post ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Invalid post ID 500', err });
    });
}

module.exports = router;
