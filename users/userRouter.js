const express = require('express');
const userDb = require('./userDb')
const db = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  // do your magic!
  userDb.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  // do your magic!
    db.insert(req.text)
      .then(newPost => {
        res.status(201).json(newPost)
      })
      .catch(next)
});

router.get('/', (req, res, next) => {
  // do your magic!
  userDb.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      next(err)
    })
});

router.get('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  res.status(200).json(req.user) // req.user comes from the validateUserId middleware
});

router.get('/:id/posts',validateUserId(), (req, res, next) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(next)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  userDb.remove(req.params.id)
    .then(() => {
        res.status(200).json({
          message: "The user is deleted"
        })
    })
    .catch(next);
});

router.put('/:id', validateUserId(), validateUser(), (req, res, next) => {
  // do your magic!
    userDb.update(req.params.id, req.body)
      .then(() => {
          res.status(200).json({
            message: "Name is updated"
          })
      })
      .catch(next)
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    userDb.getById(req.params.id)
      .then(user => {
        if(user) {
          // attach a value to our request, so it's available in other middleware functions
          req.user = user
          next() // move to the route handler or next piece of middleware
        } else {
          res.status(404).json({
            message: "User not found"
          })
        }
      })
      .catch(err => {
         next(err)
      })
  }
}

function validateUser() {
  // do your magic!
  return(req, res, next) => {
    if(!req.body.name) {
      return res.status(400).json({
        message: "Missing Name Input"
      })
    }
    next()
  }
}

function validatePost() {
  // do your magic!
  return(req, res, next) => {

    body = {
      text: req.body.text,
      user_id: req.params.id
    };

    if(!req.body.text) {
      return res.status(400).json({
        message: "Missing text input"
      })
    } else {
      req.text = body;
      next()
    }
  }
}

module.exports = router;
