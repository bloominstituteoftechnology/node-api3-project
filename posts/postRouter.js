const express = require('express');

const router = express.Router();

const postDB = require('./postDb');

const {
  validatePostId,
  validateUserId,
  validateUser,
  validatePost
} = require('../customMiddleware.js');

router.get('/', async (req, res) => {
  try {
      let posts = await postDB.get()
      res.status(200).json({motd: process.env.MOTD, posts})
  } catch(err) {
      console.error(err)
      res.status(500).json({ error: "The posts information could not be retrieved." })
  }
})

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    await postDB.remove(req.params.id)
    res.status(200).json(req.post)
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ error: "Couldn't remove post, internal server error." })
  }
});

router.put('/:id', validatePostId, async (req, res) => {
  try {
    await postDB.update(req.params.id, req.body);
    let post = await postDB.getById(req.params.id);
    res.status(201).json(post);
} catch(err) {
    console.error(err)
    res.status(500).json({ error: "The post could not be updated." })
}
});

module.exports = router;
