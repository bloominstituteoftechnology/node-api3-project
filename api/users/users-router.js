const express = require('express');

const Users = require("./users-model")
const Posts = require("../posts/posts-model")
const mw = require("../middleware/middleware")

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/',  (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get() 
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err =>{
      res.status(500).json({message: err.message})
    })
  });

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
 res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

  const newUser = req.body;
  Users.insert(newUser);
  res.status(201).json(newUser);

});

router.put('/:id', mw.validateUserId, mw.validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const changes = req.body
  const {id} = req.params
  const updatedUser = await Users.update(id, changes)
  res.status(201).json(updatedUser)
});

router.delete('/:id', mw.validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  
    const {id} = req.params
    const deletedUser = await Users.remove(id)
    res.status(201).json(deletedUser)
})

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const {id} = req.params
  Users.getUserPosts(id)
  .then(messages => {
    res.status(200).json(messages)
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error getting the postss for the user',
    });
  });
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, async(req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const result = await Posts.insert({
    user_id: req.params.id,
    text: req.body.text,
  });
  res.status(201).json(result);

});

// do not forget to export the router
module.exports = router