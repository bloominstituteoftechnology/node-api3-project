const express = require('express');
const Users = require('./userDb.js')
const router = express.Router();

router.post('/', (req, res) => {
  res.status(201).json(req.body);
});

router.post('/:id/posts', (req, res) => {
  res.status(201).json(req.post)
});

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    users 
    ? res.status(200).json(users)
    : res.status(404).json({ error: "Users not found" })
  })
  .catch(err => {
    res.status(500).json({ error: "Unable to retrience users at this time" })
  })
});

router.get('/:id', (req, res) => {
  const user = req.user;
  res.status(200).json(user)
});

router.get('/:id/posts', (req, res) => {
  const user = req.user;
  res.status(200).json(user)
});

router.delete('/:id', (req, res) => {
  const user = req.user;
  Users.remove(user.id)
  .then(removed => {
    removed === 1
    ? res.status(200).json(removed)
    : res.status(404).json({ error: "User does not exist" })
  })
  .catch(err => {
    res.status(500).json({ error: "Unable to delete user at this time" })
  })
});

router.put('/:id', (req, res) => {
  const user = req.user;
  const payload = req.body;

  payload.name
  ? Users.update(user.id, payload)
    .then(updated => {
      res.status(200).json(payload)
    })
    .catch(err => {
      res.status(500).json({ error: "Unable to update user at this time" })
    })
  : res.status(400).json({ error: "Please include the user name" })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;