const express = require('express');

const userDatabase = require('./userDb')
const postDatabase = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDatabase.insert(req.body)
              .then(user => {
                res.status(201).json(user);
              }).catch(err => {error: "Could not post"})
});

router.post('/:id/posts',validatePost, validateUserId, (req, res) => {
  // do your magic!
  newPost = {
    user_id: req.params.id,
    text: req.body.text
  }
  postDatabase.insert(newPost)
              .then(post => {
                res.status(201).json(post)
              }).catch(err => {error: "Could not post"})
});

router.get('/', (req, res) => {
  // do your magic!
  database.get().then(users => {
    res.status(200).json(users);
  }).catch(err => { error: "The users information could not be retrieved."});
});

router.get('/:id', (req, res) => {
  // do your magic!
  router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
  });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  router.get('/:id/posts', validateUserId, (req, res) => {
    database.getUserPosts(req.params.id).then(post => {
      res.status(200).json(post);
    }).catch(err => { error: "The users information could not be retrieved."});

});

router.delete('/:id', (req, res) => {
  // do your magic!
  database.remove(req.params.id).then(user => {
    res.status(200).json(user);
  }).catch(err => { error: "The users information could not be retrieved."});
});

router.put('/:id', (req, res) => {
  // do your magic!
  database.update(req.params.id, req.body).then(userID => {
    database.getById(req.params.id).then(user => {
      res.status(200).json(user);
    }).catch(err => { error: "The users information could not be retrieved."});

  }).catch(err => { error: "The users information could not be retrieved."});

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  userDatabase.getById(req.params.id)
              .then(user => {
                if(!user){
                  res.status(400).json({error: "Invalid user ID"})
                }else{
                  req.user = user;
                  next();
                }
              }).catch(err => {error: "The user does not exist"})
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = {router, validatePost};
