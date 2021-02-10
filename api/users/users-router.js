const express = require('express');

const Users = require('./users-model');
const mw = require('../middleware/middleware');

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE USERS
router.get('/', (req, res) => {
  Users.get(req.query)
  .then((users) =>{
    res.status(200).json(users);
  })
  .catch((error) =>{
    res.status(500).json({message: 'Error retrieving Users'});
  })
});

//RETURN A USER WITH SPECIFIED ID
router.get('/:id', mw.validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// RETURN THE NEWLY CREATED USER OBJECT
router.post('/', mw.validateUser, (req, res) => {
  Users.insert(req.body)
  .then((user) =>{
    res.status(201).json(user);
  })
  .catch((error) =>{
    res.status(500).json({message: 'Error adding User'});
  })
});

// RETURNs THE FRESHLY UPDATED USER OBJECT
router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
  .then((user) =>{
    res.status(200).json(user);
  })
  .catch((error) =>{
    res.status(500).json({message: `Error updating User`});
  })
});

// RETURN THE FRESHLY DELETED USER OBJECT
router.delete('/:id', mw.validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then((user) =>{
      res.status(200).json({message: 'User has been deleted'});
    })
    .catch((error) =>{
      res.status(500).json({message: 'Error deleting User'});
    })
});

// RETURN THE ARRAY OF USER POSTS
router.get('/:id/posts', mw.validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then((posts) =>{
    res.status(200).json(posts)
  })
  .catch((error) =>{
    res.status(500).json({message: 'Error retrieving posts'})
  })
});

router.post('/:id/posts',mw.validateUserId, mw.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
