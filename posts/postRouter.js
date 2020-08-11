const express = require('express');
const posts = require('./postDb');
const logger = require('../middleware/logger');
const validatePost = require('../middleware/validatePost');
const validatePostId = require('../middleware/validatePostId');
const router = express.Router();

// router.post("/", validatePost(), (req, res, next) => {
//   posts
//     .insert(req.body)
//     .then((post) => res.status(201).json({ post }))
//     .catch((err) => res.status(500).json({ message: err }));
// });

router.get('/', logger(), (req, res) => {
  // do your magic!
  posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => err.status(500).json({ message: err }));
});

router.get('/:id', logger(), validatePostId(), (req, res) => {
  posts
    .getById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ message: err }));
});

router.delete('/:id', logger(), validatePostId(), (req, res) => {
  posts
    .remove(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ message: err }));
});

router.put('/:id', logger(), validatePostId(), (req, res) => {
  posts
    .update(req.params.id, req.body)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ message: err }));
});

// custom middleware

module.exports = router;
