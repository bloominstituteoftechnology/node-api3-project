const express = require('express')
const users = require('./userDb')
const posts = require('../posts/postDb')

const router = express.Router()

router.post('/', validateUser, (req, res) => {
  // do your magic!
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'There was an error while saving the user to the database',
      })
    })
})

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const user = { ...req.body, user_id: req.params.id }
  posts
    .insert(user)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      })
    })
})

router.get('/', (req, res) => {
  users
    .get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The users information could not be found.',
      })
    })
})

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  users
    .getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The user information could not be retrieved.',
      })
    })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The posts could not be retrieved.',
      })
    })
})

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.getById(req.params.id).then(user => {
    res.status(200).json(user)
  })
  users.remove(req.params.id).catch(error => {
    console.log(error)
    res.status(500).json({
      error: 'The user could not be removed',
    })
  })
})

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // do your magic!
  users
    .update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The user information could not be modified.',
      })
    })
})

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id).then(user => {
    if (!user) {
      res.status(404).json({ message: 'invalid user id' })
    } else {
      req.user = user
      next()
    }
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing user data' })
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' })
  } else if (req.body) {
    return next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing post data' })
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  } else if (req.body) {
    return next()
  }
}

module.exports = router
