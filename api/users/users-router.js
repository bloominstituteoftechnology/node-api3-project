const express = require('express')
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const mw = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({message: err.message})
  })
});

router.get('/:id', mw.validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res) => {
  const newUser = req.body
  Users.insert(newUser)
  res.status(201).json(newUser) 
});

router.put('/:id', mw.validateUserId, mw.validateUser, async (req, res) => {
  const changes = req.body
  const {id} = req.params
  const updatedUser = await Users.update(id, changes)
  res.status(201).json(updatedUser)
});

router.delete('/:id', mw.validateUserId, async (req, res) => {
  const {id} = req.params
  const deletedUser = await Users.remove(id)
  res.status(201).json(deletedUser)
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  const {id} = req.params
  Users.getUserPosts(id)
  .then(messages => {
    res.status(200).json(messages)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting the posts for the user'})
  })
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, async (req, res) => {
  const result = await Posts.insert({
    user_id: req.params.id,
    text: req.body.text
  })
  res.status(201).json(result)
});

// do not forget to export the router
module.exports = router