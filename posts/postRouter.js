const express = require('express');

const Posts = require('./postDb')

const middlewares = require('../middlewares/middlewares')

const router = express.Router();

router.get('/', (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving the posts' })
    })
});

router.get('/:id', middlewares.validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', middlewares.validatePostId, (req, res) => {
  Posts.remove(req.params.id)
  .then(count => {
    count > 0
    res.status(200).json({ message: 'The post has been deleted' })
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Error removing the post' })
  });

});

router.put('/:id', middlewares.validatePostId, (req, res) => {
  const changes = req.body
  Posts.update(req.params.id, changes)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
});

module.exports = router;
