const express = require('express');
const db = require('./postDb');
const router = express.Router();

router.get('/', logger, (req, res) => {
  const posts = db.get()
  res.json(posts);
});

router.get('/:id', logger, validatePostId, (req, res) => {
  const id = parseInt(req.params.id);
  const post = db.getById(id);
  res.json(post);
});

router.delete('/:id', logger, validatePostId, (req, res) => {
  const id = parseInt(req.params.id);
  const post = db.getById(id);
  db.remove(id);
  res.json(post);
});

router.put('/:id', logger, validatePostId, (req, res) => {
  const id = parseInt(req.params.id);
  const post = req.body;
  db.update(id, post);
  res.status(200).json(req.body);
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
    res.json(req.post);
  }
  else {
    res.status(400).json({ message: "invalid post id" })
  }
  next();
}



module.exports = router;
