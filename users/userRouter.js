const express = require('express');

const router = express.Router();

const userDB = require('./userDb');
const postDB = require('../posts/postDb');

const {
  validatePostId,
  validateUserId,
  validateUser,
  validatePost
} = require('../customMiddleware');

router.post('/', validateUser, async (req, res) => {
  try {
    let user = await userDB.insert(req.body);
    res.status(201).json(user)
  }
  catch(err) {
    console.error(err)
    res.status(500).json({ error: "Could not post that user, internal server error." })
  }
});

router.post('/:id/posts', validatePost, async (req, res) => {
  try {
    let post = postDB.insert(req.body)
    res.status(201).json(post)
  }
  catch(err) {
    console.error(err)
    res.status(500).json({ error: "Could not post that user, internal server error." })
  }
});

router.get('/', async (req, res) => {
  try {
    let users = await userDB.get()
    res.status(200).json({motd: process.env.MOTD, users})
} catch(err) {
    console.error(err)
    res.status(500).json({ error: "The users information could not be retrieved." })
}
});

router.get('/:id', validateUserId, async (req, res) => {
  try {
    res.status(200).json(req.user)
} catch(err) {
    console.error(err)
    res.status(500).json({ error: "The user information could not be retrieved." })
}
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    let posts = await userDB.getUserPosts(req.params.id)
    res.status(200).json(posts)
} catch(err) {
    console.error(err)
    res.status(500).json({ error: "The posts information could not be retrieved." })
}
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    await userDB.remove(req.params.id)
    res.status(200).json(req.user)
} catch(err) {
    console.error(err)
    res.status(500).json({ error: "The user could not be deleted." })
}
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    await userDB.update(req.params.id, req.body)
    let user = await userDB.getById(req.params.id)
    res.status(201).json(user)
} catch(err) {
    console.error(err)
    res.status(500).json({ error: "The user could not be updated." })
}
});




module.exports = router;
