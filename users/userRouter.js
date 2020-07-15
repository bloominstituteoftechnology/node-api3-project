const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb');
const router = express.Router();

// router.use('/users')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'Error adding the user.',
      err
    })
  })
});

router.post('/:id/posts', [validatePost, validateUserId], (req, res) => {
  // do your magic!
  const postInfo = { ...req.body, user_id: req.params.id }
  Users.insert(postInfo)
  .then(userPost => {
    res.status(201).json(userPost)
  })
  .catch(err => {
    res.status(500).json({
      message: 'There was an error while saving the post to the database.',
      err
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'Error retrieving the user.',
      err
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', [validateUserId,validatePost], (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(userPost => {
    if (userPost) {
      res.status(200).json(userPost)
    } else {
      res.status(404).json({
        message: 'The post with the specified ID does not exist.'
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      message: 'The post information could not be retrireved.'
    })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The user has been deleted.' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Error removing the user', error });
  });
});

router.put('/:id', [validateUserId, validatePost], (req, res) => {
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

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        // res.status(404).json({ message: 'does not exist' });
        next(new Error('does not exist'));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'exception', err });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body;
  !body || body === {} ?
    res.status(400).json({ message: 'Please include request body' })
    :
    next();
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  !body || body === {} ?
    res.status(400).json({ message: 'Please include request body' })
    :
    next();
}

router.use((error, req, res, next) => {
  res.status(400).json({
    message: 'there was an error',
    error
  })
})

module.exports = router;
