const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      users
        ? res.status(200).json(users)
        : res.status(404).json({ error: "404 not found, go home" })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Backend error, contact SOMEBODY" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const user = req.user;
  res.status(200).json(user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const user = req.user;
  Users.getUserPosts(user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Backend error, contact SOMEBODY" })
    })
});

router.post('/', validateUser, (req, res) => {
  res.status(201).json(req.body);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  res.status(201).json(req.post);
});

router.delete('/:id', validateUserId, (req, res) => {
  const user = req.user;

  Users.remove(user.id)
    .then(removedUser => {
      removedUser === 1
        ? res.status(200).json(removedUser)
        : res.status(404).json({ message: "That user does not exist" })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Backend error, contact SOMEBODY" })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const user = req.user;
  const payload = req.body;

  if (payload.name) {
    Users.update(user.id, payload)
      .then(updatedUser => {
        res.status(200).json(payload)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Backend error, contact SOMEBODY" })
      })
  } else {
    res.status(400).json({ error: "missing required name field" })
  }
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      req.user = user
      user === undefined
        ? res.status(400).json({ message: "Invalid user id" })
        : next()
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Backend error, contact SOMEBODY" })
    })
}

function validateUser(req, res, next) {
  const payload = req.body;
  console.log(payload)

  if (payload.name === '') {
    res.status(400).json({ message: "missing required name field" });
  } else if (!payload.name) {
    res.status(400).json({ message: "missing user data" })
  } else {
    Users.insert(payload)
      .then(user => {
        req.body = user;
        next();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Backend error, contact SOMEBODY" });
      });
  }

};

function validatePost(req, res, next) {
  const { id } = req.params;
  const payload = { ...req.body, user_id: id }

  payload.text
  ?Posts.insert(payload)
    .then(post => {
      req.post = post;
      next();
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Backend error, contact SOMEBODY" })
    })
  : res.status(400).json({ error: "missing required text field" })
}

module.exports = router;