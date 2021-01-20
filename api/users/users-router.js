const express = require('express');

const router = express.Router();

const {validateUserId, validateUser, validatePost} = require('../middleware/middleware');

const postsModel = require('../posts/posts-model');
const usersModel = require('../users/users-model'); 

router.post('/', validateUser, (req, res) => {
  usersModel.insert(req.body)
  .then((post) => {
    res.status(201).json(post)
  })
  .catch((err) => {
    res.status(500).json({ messsage: err.message })
  })
});

router.get('/', (req, res) => {
  usersModel.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.delete('/:id', validateUserId, (req, res) => {
  usersModel.remove(req.user.id)
  .then((deleted) => {
    res.status(200).json(deleted)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message })
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  usersModel.update(req.user.id, req.body)
  .then((update) => {
    res.status(200).json(update)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const post = {user_id: req.user.id, text: req.body.text }

  postsModel.insert(post)
    .then((posted) => {
      res.status(201).json(posted)
    })
    .catch((err) => {
      res.status(500).json({ message: err.message })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {

  usersModel.getUserPosts(req.user.id)
  .then((user) => {
    res.status(201).json(user)
  })
  .catch((err) => {
    res.status(500).json({ message: err.message})
  })
});

module.exports=router;