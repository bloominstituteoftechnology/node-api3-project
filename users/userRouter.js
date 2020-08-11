const express = require('express');
const users = require('../users/userDb');
const posts = require('../posts/postDb');
const logger = require('../middleware/logger');
const validatePost = require('../middleware/validatePost');
const validateUser = require('../middleware/validateUser');
const validateUserId = require('../middleware/validateUserId');
const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  // users
  //   .insert(req.body.name)
  //   .then((res) => res.status(201).json({ message: "User created" }))
  //   .catch((err) => res.status(500).json({ message: err }));
  users
    .insert(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: err }));
});

router.post(
  '/:id/posts',
  logger(),
  validateUserId(),
  validatePost(),
  (req, res) => {
    posts
      .insert({ text: req.body.text, user_id: req.params.id })
      .then(post => res.status(201).json({ post }))
      .catch(err => res.status(500).json({ message: err }));
  }
);

router.get('/', logger(), (req, res) => {
  users
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => status(500).json({ message: err }));
});

router.get('/:id', logger(), validateUserId(), (req, res) => {
  users
    .getById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: err }));
});

router.get('/:id/posts', logger(), validateUserId(), (req, res) => {
  users
    .getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).jsonn({ message: err }));
});

router.delete('/:id', logger(), validateUserId(), (req, res) => {
  users
    .remove(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: err }));
});

router.put('/:id', logger(), validateUserId(), (req, res) => {
  users
    .update(req.params.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: err }));
});

//custom middleware

module.exports = router;
