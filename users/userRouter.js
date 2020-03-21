const express = require('express');
const db = require('./userDb');
const router = express.Router();

router.post('/', logger, validateUser, (req, res) => {
  const user = (req.body)
  db.insert(user)
    .then(results => {
      res.status(201).json(results);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the new user to the database" })
    })
});

router.post('/:id/posts', logger, validatePost, (req, res) => {
  const id = req.params.id
  const post = { text: req.body.text, post_id: id }
  db.insertPost(post)
    .then(results => {
      res.status(201).json(results);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the user's new post to the database." })
    })

});

router.get('/', logger, (req, res) => {
  const users = db.get()
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved." })
    })
});

router.get('/:id', logger, validateUserId, (req, res) => {
  const id = req.params.id
  const user = db.getById(id)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be retrieved." })
    })
});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  const id = parseInt(req.params.id)
  const userPosts = db.getUserPosts(id)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "The user's posts could not be retrieved." })
    })
});

router.delete('/:id', logger, validateUserId, (req, res) => {
  const id = req.params.id
  db.remove(id)
    .then(results => {
      res.json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "Could not delete post." })
    })
});

router.put('/:id', logger, validateUser, (req, res) => {
  const id = parseInt(req.params.id)
  const user = req.body
  db.update(id, user)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update post." })
    })
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
    next();
  }
  else {
    res.status(400).json({ message: "invalid user id" })
    next();
  }
}

function validateUser(req, res, next) {
  if (Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" })
    next();
  }
  else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
    next();
  }
  else {
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
