const express = require('express');
const router = express.Router();

const user = require('./users-model')
const post = require('../posts/posts-model')
const mw = require('../middleware/middleware.js')


router.get('/', (req, res) => {
  user.get(req.query)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(422).json({ message: 'Error retrieving users' })
    })
});

router.get('/:id', mw.validateUserId, (req, res) => {
  const {id} = req.params
  user.getById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

router.post('/', mw.validateUser, (req, res) => {
  // user.insert({
  //   id: 10,
  //   name: "Mykael"
  // })
  user.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  const {id} = req.params
  const changes = req.body
  user.update(id, changes)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

router.delete('/:id', mw.validateUserId, (req, res) => {
  const {id} = req.params
  user.remove(id)
    .then(user => {
      res.status(200).json({ message: "user deleted" })
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

router.get('/:id/posts', mw.validateUserId,  (req, res) => {
  const {id} = req.params
  user.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, (req, res) => {
  const { id } = req.user;
  const newPost = req.body;
  Post.insert(newPost)
    .then(post => {
      res.status(201).json(newPost)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

module.exports = router