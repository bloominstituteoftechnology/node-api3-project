const express = require('express')
const posts = require('./postDb.js')
const router = express.Router()

router.get('/', (req, res) => {
  // do your magic!
  posts
    .get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The users information could not be retrieved.',
      })
    })
})

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts
    .getById(req.params.id)
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

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts.getById(req.params.id).then(post => {
    res.status(200).json(post)
  })
  Posts.remove(req.params.id).catch(error => {
    console.log(error)
    res.status(500).json({
      error: 'The post could not be removed',
    })
  })
})

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts
    .update(req.params.id, req.param.body)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The post information could not be modified.',
      })
    })
})

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  posts.getById(req.params.id).then(post => {
    if (!post) {
      res.status(404).json({ message: 'invalid post id' })
    } else {
      req.post = post
      next()
    }
  })
}

module.exports = router
