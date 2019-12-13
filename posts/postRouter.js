const express = require('express');

const posts = require('../posts/postDb')

const validateUserId = require('../middleware/validateUserId')
const validateUser = require('../middleware/validateUser')
const validatePost = require('../middleware/validatePost')

const router = express.Router();

router.get('/', async (req, res, next) => {
  // do your magic!
   try {
    res.json(await posts.get())
  }
  catch (err) {
     next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  // do your magic!
  try {
    return res.json(await posts.getById(req.body.id))
  }
  catch (err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  // do your magic!
  try {
    await posts.remove(req.body.id)
    return res.status(204).end()
  }
  catch (err) {
    next(err)
  }
});

router.put('/:id', validatePost, async (req, res, next) => {
  // do your magic!
  try {
    await posts.update(req.params.id, req.body)
    return res.json(await posts.getById(req.params.id))
  }
  catch (err) {
    next(err)
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router