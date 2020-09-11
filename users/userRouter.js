const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');
const router = express.Router();


router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then( user => {
      res.status(201).json(user);
    })
    .catch( (err) => {
      res.status(500).json({
        message: 'There was an error adding the user',
        err
      })
    })
});


router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Posts.insert({...data, user_id: id})
    .then( post => {
      res.status(201).json({
        post,
        message: "The post was added successfully"
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'There was an error adding the post',
        error: err
      })
    })
});

router.get('/', (req, res) => {
  Users.get(req.query)
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    res.status(500).json({
      message: "There was an error on fetching users",
      err
    })
  })
});


router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      user 
        ? res.status(200).json(user)
        : res.status(404).json({
          message: "The user with that ID does not exist"
        })
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error retreving the user from the database",
        err
      })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const userId = parseInt(req.params.id)
  Users.getUserPosts(userId)
    .then((userPosts) => {
      userPosts.length != 0
        ? res.status(200).json(userPosts)
        : res.status(404).json({
            messaage: "There are no posts by this user"
          })
    })
    .catch((err) => {
      res.status(500).json({
        message: "The was an eror retrieving the posts from the database",
        err
      })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(parseInt(req.params.id))
  .then((user) => {
    user
      ? res.status(200).json({ user, message: "user was successfully deleted" })
      : res.status(404).json({ message: "That user does not exist" })
  })
  .catch((err) => {
    res.status(500).json({
      message: "There was an error on the server",
      err
    })
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      user
        ? res.status(200).json({
            user,
            message: "The user was updated"
          })
        : res.status(404).json({
          message: "That user does not exist"
        })
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error with the server",
        err
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id)
    .then((userid) => {
      !userid
        ? res.status(404).json({
          message: 'Invalid User ID'
        })
        : next()
    })
}

function validateUser(req, res, next) {
  const data = req.body;
  !data ? res.status(400).json({ message: "missing user data" })
  : !data.name ? res.status(400).json({ message: "missing required name" })
  : next();
}

function validatePost(req, res, next) {
  const data = req.body;
  !data ? res.status(400).json({ message: "missing post data" })
  : !data.text ? res.status(400).json({ message: "missing required text field" })
  : next();
}

module.exports = router;
