const express = require('express');
const db = require('./userDb');
const router = express.Router();

router.post('/', logger, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', logger, validatePost, (req, res) => {
  const post_id = parseInt(req.params.id);
  const post = { text: req.body.text, post_id: post_id }
  db.insert(post);
  res.status(201).json(post);
});

router.get('/', logger, (req, res) => {
  const users = db.get();
  res.json(users);
});

router.get('/:id', logger, validateUserId, (req, res) => {
  const id = parseInt(req.params.id);
  const post = db.getById(id)
  res.json(post);
});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  const id = parseInt(req.params.id);
  const userPosts = db.getUserPosts(id);
  res.json(userPosts);
});

router.delete('/:id', logger, validateUserId, (req, res) => {
  const id = parseInt(req.params.id);
  db.remove(id);
});

router.put('/:id', logger, validateUser, (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.body;
  db.update(id, user);
  res.status(200).json(req.body);
});

//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
};

function validateUserId(req, res, next) {
  if (db.getById(req.id)) {
    res.json(req.user);
  }
  else {
    res.status(400).json({ message: "invalid user id" })
  }
  next();
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  }
  else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  }
  else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  }
}

module.exports = router;
