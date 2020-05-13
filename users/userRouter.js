const express = require('express');

const { 
  validateUserId,
  validateUser,
  validatePost
} = require("../middleware")

const DB = require("./userDb");
const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  try {
    const user = await DB.insert(req.body)
    if (user) {
      return res.status(201).json(user)
    }
  } catch(e) {
    if (e.code === `SQLITE_CONSTRAINT`) {
      const user = await DB.getByName(req.body.name)
      if (user) {
        return res.status(201).json(user)
      }
    }
    res.status(500).json('Self-destruct sequence activated.')
  }  
});

router.post('/:id/posts', validateUserId, async (req, res) => {
  const posts = await DB.getUserPosts(req.params.id)
  if (posts) { return res.status(201).json(posts) }
  res.status(404).json({ message: "no posts!" })
});

router.get('/', async (req, res) => {
  const users = await DB.get()
  if (users) { return res.status(200).json(users) }
  res.status(404).json({ message: "Nada" })
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

router.delete('/:id', validateUserId, async (req, res) => {
  const removeCount = await DB.remove(req.params.id)
  if (removeCount > 0) { return res.status(201).json(`${removeCount} user(s) has been removed`)}
  res.status(500).json("Houston, we have a problem.")
});

router.put('/:id', async (req, res) => {
  const updateCount = await DB.update(req.params.id, req.body)
  if (updateCount > 0) { return res.status(201).json(`${updateCount} user(s) has been updated`)}
  res.status(500).json("Critical error!")
});

module.exports = router;
