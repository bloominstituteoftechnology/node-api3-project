const express = require('express');

const Posts = require('./postDb');
const { validatePostId, validatePostBody } = require('../middleweare/mwFunctions');

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


router.put('/:id', [validatePostBody, validatePostId], (req, res) => {
  const { id } = req.params;

  Posts.update(id, req.body)
    .then(() => {
      res.status(200).json({ success: 'The post was successfuly updated!', info: req.body });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Cannot save the updates!', err });
    });
});

module.exports = router;
