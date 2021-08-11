const express = require('express')
const Users = require('./users-model.js')
const Posts = require('../posts/posts-model.js')
const mw = require('../middleware/middleware.js')

const router = express.Router()
const {validateUserId, validateUser, validatePost} = mw

// GET [] all users
router.get('/', (req, res) => {
  Users.get()
    .then(users => res.json(users))
    .catch(() => res.status(500)
      .json('SERVER ERROR: retrieving all users'))
})

// GET user {} by id
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
})

// POST new user {}
router.post('/', (req, res) => {
  ! req.body.name
    ? res.status(422)
    .json('Please provide desired username')
    : Users.insert(req.body)
    .then(() => res.json(req.body))
    .catch(() => res.status(500)
      .json('SERVER ERROR: creating new user'))
  // this needs a middleware to check that the request body is valid
})

// PUT updated user {} by id
router.put('/:id', validateUserId, async (req, res) => {
  const { id } = req.params
  const changes = req.user
  
  try {
    if ( ! changes.name) {
      res.status(422)
        .json('Please provide updated name')
    } else {
      const updatedUser = await Users.update(id, changes)
      ! updatedUser
        ? res.status(404)
        .json('CLIENT ERROR: User does not exist with that ID')
        : res.status(200)
        .json(changes)
    }
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
})

// DELETE user {} by id
router.delete('/:id', validateUserId, async (req, res) => {
  const { id } = req.params
  const deletedUser = await Users.remove(id)
  
  try {
    if ( ! deletedUser) {
      res.status(404)
        .json('CLIENT ERROR: User does not exist with that ID')
    } else {
      res.status(201)
        .json('Oh yay! User deleted; go have a taco!')
    }
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
  // this needs a middleware to verify user id
})

// GET posts [] by user ID
router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id)
    .then(user => ! user
      ? res.status(404)
        .json('CLIENT ERROR: Posts not found for user')
      : res.status(200)
        .json(user))
    .catch(() => res.status(500)
      .json('SERVER ERROR: retrieving posts by user ID'))
  // this needs a middleware to verify user id
})

// POST new post {}
router.post('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  ! req.body.text
    ? res.status(422)
    .json('Please provide post text')
    : Posts.insert(req.body)
    .then(() => res.status(201)
      .json('Post created successfully'))
    .catch(err => res.status(500)
      .json(err.message))
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
})

module.exports = router
