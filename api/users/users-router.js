const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const mw = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

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

router.post('/', mw.validateUser, async (req, res) => {
  try{
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  }catch (err){
    res.status(500).json({message: 'Something went wrong'})
  }
});

router.put('/:id', mw.validateUser, mw.validateUserId, async (req, res) => {
  const changes = req.body
  const {id} = req.params
  const updatedUser = await Users.update(id, changes)
  res.status(201).json(updatedUser)
});

router.delete('/:id', mw.validateUserId, async (req, res) => {
  try{
    const user = await Users.getById(req.params.id)
    const deletedUser = await Users.remove(req.params.id)
    res.status(200).json(user)
  }catch(err){
    res.status(500).json({message: 'something went wrong'})
  }
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

router.post('/:id/posts', mw.validatePost, mw.validateUserId, async (req, res) => {
  const result = await Posts.insert({
    user_id: req.params.id,
    text: req.body.text
  })
  res.status(201).json(result)
});

// do not forget to export the router
module.exports = router