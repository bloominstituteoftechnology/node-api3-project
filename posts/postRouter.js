const express = require('express');

const { 
  validateUserId,
  validateUser,
  validatePost,
  validatePostId
} = require("../middleware")

const DB = require("./postDb");
const router = express.Router();

router.get('/', (req, res) => {
  DB.get()
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json("sum ting wong"))
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.post('/', validatePost, async (req, res) => {
  const post = await DB.insert(req.body)
  if (post) {
    return res.status(201).json(post)
  }
  res.status(500).json("Oof.")
})

router.delete('/:id', validatePostId, async (req, res) => {
  const post = await DB.remove(req.post.id)
  if (post > 0) {  return res.status(201).json(`${post} post has been removed`) }
  res.status(404).json({ message: 'No post removed' })
});

router.put('/:id', validatePost, async (req, res) => {
  const post = await DB.update(req.params.id, req.body)
  if (post > 0) {  return res.status(201).json(`${post} post has been Updated`) }
  res.status(404).json({ message: 'No post updated' })
});

module.exports = router;
