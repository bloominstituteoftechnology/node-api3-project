const express = require('express');
const Users = require('./userDb.js')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  res.status(201).json(req.body);
});

router.post('/:id/posts', validateUser, (req, res) => {
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

router.get('/:id', validateUserId, (req, res) => {
  const user = req.user;
  res.status(200).json(user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
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
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      req.user = user
      user === undefined
      ? res.status(404).json({ error: "User not found" })
      : next();
    })
    .catch(err => {
      res.status(500).json({ error: "Error on backend, please contact the sysadmin" })
    })
}

function validateUser(req, res, next) {
  const payload = req.body;

  payload.name === ''
  ? res.status(401).json({ error: "Missing user name" })
  : !payload.name ? res.status(401).json({ error: "Missing user data" })
  : Users.insert(payload)
    .then(user => {
      req.body = user;
      next();
    })
    .catch(err => {
      res.status(500).json({ error: "Error on backend, please contact the sysadmin" })
    })
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;