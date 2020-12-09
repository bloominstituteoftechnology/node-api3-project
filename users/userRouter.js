const express = require('express');
const users = require('./userDb');//capitalize to differentiate db related
const posts = require('../posts/postDb');
const {validateUserId, validateUser, validatePost} = require('./usersMiddleware');

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  // do your magic!
  users.insert({name: req.body.name})
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'whoops!'
      })
    })
});

router.post('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  // do your magic!
  posts.insert({
    user_id: req.params.id,  
    text: req.body.text
  })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Server is not up to that task',
      })
    });
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'that\'s a nope',
      })
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'server is on holiday',
      })
    });
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    .then(() => res.status(200).json({
      message: 'User is gone',
    }))
    .catch(err =>{
      console.log(err);
      res.status(500).json('We seem to have broken something.');
      });
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json('Server oopsed.')
    });
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
