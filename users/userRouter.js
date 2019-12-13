const express = require('express');
const users = require('../users/userDb')
const posts = require('../posts/postDb')

const validateUserId = require('../middleware/validateUserId')
const validateUser = require('../middleware/validateUser')
const validatePost = require('../middleware/validatePost')

// const logger = require('../server')

const router = express.Router();

router.post('/', validateUser, async (req, res, next) => {
  // do your magic!
  try {
    const user = {
      name: req.body.name
    }

    return res.json(await users.insert(user))
  }
  catch (err) {
    next(err)
  }
});

router.post('/:id/posts', validatePost, validateUser, async (req, res, next) => {
  // do your magic!
  try {
    // payload = all the data that is required.
    const post ={
      text: req.body.text,
      user_id: req.params.id,
    }

    return res.json(await posts.insert(post))
  }
  catch (err) {
    next(err)
  }
});

router.get('/', async (req, res, next) => {
  // do your magic!
  try {
    return res.json(await users.get())
  }
  catch (err) {
    next(err)
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  // do your magic!
  try {
    res.json(await users.getById(req.params.id))
  }
  catch (err) {
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // do your magic!
  try { 
    return res.json(await users.getUserPosts(req.params.id))
  }
  catch (err) {
    next(err)
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // do your magic!
  try {
    await users.remove(req.params.id)
    return res.status(204).end()
  }
  catch (err) {
    next(err)
  }
});

router.put('/:id', validateUser, validateUserId, async (req, res, next) => {
  // do your magic!
  try {
    const updateUser = {
      name: req.body.name,
    }

    await users.update(req.params.id, updateUser)
    return res.json(await users.getById(req.params.id))
  }
  catch(err) {
    next(err)
  }
});

//custom middleware

// function validateUserId() {
//   return (req, res, next) => {
    
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router
