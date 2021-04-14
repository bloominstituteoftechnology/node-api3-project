const express = require('express');
const users = require("./users-model")
const posts = require("../posts/posts-model")
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware")
// The middleware functions also need to be required

const router = express.Router();

router.get('/users', (req, res, next) => {
  users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get('/users/:id', validateUserId(), (req, res, next) => {
  res.status(200).json(req.user)
});

router.post('/users', validateUser(), (req, res, next) => {
  users.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
});

router.put('/users/:id', validateUserId(), validateUser(), (req, res, next) => {
  users.update(req.user.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(next)
});

router.delete('/users/:id', validateUserId(), (req, res, next) => {
  users.remove(req.user.id)
    .then(user => {
      console.log(req)
      res.status(200).json({
        message: `${req.user.name} has been deleted`
      })
    })
    .catch(next)
});

router.get('/users/:id/posts', validateUserId(), (req, res, next) => {
  posts.get()
    .then(post => res.status(200).json(post))
    .catch(next)
});

router.post('/users/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  const postData = {
    ...req.body,
    user_id: req.params.id,
  }
  posts.insert(postData)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(next)
});

module.exports = router
