const express = require('express');
const db = require('./postDb');
const router = express.Router();

router.get('/', logger, (req, res) => {
  const posts = db.get()
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved." })
    })
});

router.get('/:id', logger, validatePostId, (req, res) => {
  const id = req.params.id
  const post = db.getById(id)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be retrieved." })
    })
});

router.delete('/:id', logger, validatePostId, (req, res) => {
  const id = req.params.id
  const post = db.getById(id)
  db.remove(id)
    .then(results => {
      res.json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "Could not delete post." })
    })
});

router.put('/:id', logger, validatePostId, validatePost, (req, res) => {
  const id = parseInt(req.params.id)
  const post = req.body
  db.update(id, post)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update post." })
    })

});

// custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
};

function validatePostId(req, res, next) {
  if (db.getById(req.id)) {
    next();
  }
  else {
    res.status(400).json({ message: "invalid post id" });
    next();
  }
}
function validatePost(req, res, next) {
  if (Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" })
    next();
  }
  else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
    next();
  }
  else {
    next();
  }
}

module.exports = router;
