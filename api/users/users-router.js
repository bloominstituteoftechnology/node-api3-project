const express = require('express');
const Users = require('./users-model');
const Posts = require('../Posts/Posts-model.js');
const { logger,validateUserId,validateUser,validatePost} = require("../middleware/middleware")
const router = express.Router();

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required,

router.get('/',logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.find(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        post: 'Error retrieving the users',
      });
    });
});

router.get('/:id',logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/',logger,validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.add(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        post: 'Error adding the user',
      });
    });
});

router.put('/:id',validateUserId, validatePost, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        post: 'Error updating the user',
      });
    });
  
});

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(201).json({post:"The user has been nuked"})
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        post: 'Error removing the user',
      });
    });
});

router.get('/:id/posts', logger,validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(Posts => {
      res.status(200).json(Posts);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        post: `Error getting the Posts for the user ${error.post} `,
      });
    });
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = { ...req.body, hub_id: req.params.id };

  Posts.add(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        post: `Error adding post to the hub ${error.post}`
      });
    });
});

// do not forget to export the router
module.exports = router;
