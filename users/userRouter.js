const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postRouter');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
 userDb.insert(req.body)
  .then((u) => {
    console.log("user:", u);
    res.status(201).json(u);
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't post a user"
    })
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  postDb.insert(req.body)
  .then((p) => {
    console.log("user:", p);
    res.status(201).json(p);
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't post a user"
    })
  })
});

router.get('/', (req, res) => {
  userDb.get()
  .then((u) => {
    res.status(200).json(u);
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't get users"
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.user.id)
  .then((u) => {
    res.status(200).json(u);
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't get user posts"
    })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.user.id)
  .then((u) => {
    console.log("user:", u);
    res.status(200).json(u)
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't delete user"
    })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  userDb.update(req.user.id, req.body)
  .then((u) => {
    console.log("user:", u);
    res.status(200).json(u)
  })
  .catch(() => {
    res.status(500).json({
      message: "couldn't update user"
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
  .then(u => {
    if (u) {
      req.user = u
      next();
    } else {
      res.status(400).json({
        message: "invalid user id"
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "error retrieving the user id"
    })
  })
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  }
  next();
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  }
  next();}

module.exports = router;
