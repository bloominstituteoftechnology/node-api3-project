const express = require('express');

const { 
  validateUserId,
  validateUser,
  validatePost
} = require("../middleware")

const DB = require("./userDb");
const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  const user = await DB.insert(req.body)
  if (user) {
    return res.status(201).json(user)
  }
  res.status(500).json('Self-destruct sequence activated.')
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  if (res.user) { return res.status(200).json(res.user) }
  return res.status(500).json("Splat!")  
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  const posts = await DB.getUserPosts(req.params.id)
  if (posts) { 
    return res.status(200).json(posts) 
  } else {
    return res.status(404).json("Where did the posts go?")
  }
  res.status(500).json("Oops~")
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

module.exports = router;
