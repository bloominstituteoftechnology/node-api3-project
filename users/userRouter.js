const express = require('express');

const Users = require('./userDb');
// const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users
  .insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({ error: 'The was an error while saving the user to the database' })
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  Users
  .get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => res.status(404).json({ message: "could not find users" }));
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' })
    }
  })
  .catch(err  => {
    res.status(500).json({ error: 'The user information could not be retrieved'})
  })
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req)
  const body = req.body;
    if (!body) {
      res.status(400).json({ message: 'missing user data' })
    } else if (!body.name) {
    res.status(400).json({ message: 'missing required name field' })
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body) {
    if (!req.body.text) {
      res.status(400).json({ message: 'missing required text field' })
    }
  } else {
    res.status(400).json({ message: 'missing post' })
  }
  console.log('Post validated');
  next();
}

module.exports = router;
