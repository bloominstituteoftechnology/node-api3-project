const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();


//posts a new user
router.post('/', validateUser, (req, res) => {
  // api/users
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error adding user'
      })
    })
});

// create a post from user
router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  // const { id } = req.user;
  const newPost = { ...req.body, user_id: req.user.id }
  console.log(req.body)
  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({
      message: 'error adding post'
    })})
});

//gets list of users
router.get('/', (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'error retrieving users'
      });
    });
});

//gets specific user
router.get('/:id', validateUserId, (req, res) => {
  console.log(req.params);
  Users.getById(req.user.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'error retrieving user'
      })
    })
});

//get a user's posts
router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      res.status(500).json({
        message: "error retrieving posts"
      })
    })
});

//deletes specific user
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.user.id)
    .then(user => {
      res.status(200).json({ message: 'user deleted' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: 'failed to delete' })
    })
});

//modifies specific user
router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.user.id, req.body)
    .then(user => {
      res.status(200).json({ message: 'user updated successfully' })
    })
    .catch(err => {
      res.status(500).json({ message: 'failed to update user' })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      if(!user){
        res.status(400).json({ message: "invalid user id" })
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "internal server error" })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(404).json({ errorMessage: "missing user data" })
  } else if(!req.body.name) {
    res.status(400).json( { message: "missing required name field" })
  }
   else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(404).json({ errorMessage: "missing post data" })
  } else if(!req.body.text) {
    res.status(400).json({ errorMessage: "missing post data" })
  } else {
    next();
  }
}

module.exports = router;
