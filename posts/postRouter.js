const express = require('express');
const postDb = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
  .then((p) => {
    res.status(200).json(p);
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't get users"
    })
  })
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  postDb.remove(req.post.id)
  .then((p) => {
    res.status(200).json(p);
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't delete post"
    })
  })});

router.put('/:id', validatePostId, (req, res) => {
  postDb.update(req.post.id, req.body)
  .then((p) => {
    res.status(200).json(p);
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't update post"
    })
  })});

// custom middleware

function validatePostId(req, res, next) {
  postDb.getById(req.params.id)
  .then(p => {
    if (p) {
      req.post = p;
      next();
    } else {
      res.status(400).json({
        message: "invalid post id"
      })
    }
  })
  .catch(() => {
    res.status(500).json({
      message: "error retrieving the post id"
    })
  })
}

module.exports = router;
