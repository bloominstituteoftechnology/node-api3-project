const express = require('express');
const { validateUser, validateUserId, validatePost } = require('../middleware');
const userDb = require("./userDb")
const postDb = require("../posts/postDb")
const router = express.Router();


router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  const post = {
    ...req.body,
    user_id: req.params.id
  }
  postDb.insert(post)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

router.get('/', (req, res) => {
  userDb.get()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  userDb.getById(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

router.put('/:id', validateUserId, (req, res) => {
  userDb.update(req.params.id, req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

module.exports = router;
