const express = require('express');
const Posts = require('./postDb.js');
const router = express.Router();

// router.use('/posts')

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({
        message: 'The post has been deleted.'
      });
    } else {
      res.status(404).json({
        message: 'The post could not be found'
      });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error deleting the post.',
    });
  });
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(400).json({
        message: 'The post could not be found.'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      message: 'Error updating the post',
      err
    })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Posts.getById(id)
  .then(post => {
    if (post) {
      req.post = post;
      next();
    } else {
      next({
        code: 400,
        message: 'missing post data'
      })
    }
  })
  .catch(err => {
    next({
      code: 500,
      message: 'server error'
    })
  })
}

router.use((error, req, res, next) => {
  res.status(400).json({
    message: 'there was an error',
    error
  })
})

module.exports = router;
