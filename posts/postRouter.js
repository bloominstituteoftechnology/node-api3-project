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

router.get('/:id', validatePost, async (req, res, next) => {
  // do your magic!
  try {
    res.json(await posts.getById(req.body.id))
  }
  catch (err) {
    next(err)
  }
});

router.delete('/:id', validatePost, async (req, res, next) => {
  // do your magic!
  try {
    await posts.remove(req.body.id)
    res.status(204).end()
  }
  catch (err) {
    next(err)
  }
});

router.put('/:id', validatePost, async (req, res, next) => {
  // do your magic!
  try {
    const updatePost = {
      text: req.body.text,
      id: req.body.id,
    }

    await posts.update(req.body.id, updatePost)
    res.json(await posts.getById(req.body.id))
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