const express = require('express');

const Users = require('../users/users-model')
const mw = require('../middleware/middleware')

const router = express.Router();

router.get('/', mw.logger, async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get();
    res.status(200).json(users)
  } catch(error){
    res.status(404).status(error.message)
  }
});

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', mw.validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const user = await Users.insert(req.body)

    res.status(200).json(user)
  } catch (error) {
    res.status(404).status(error.message)
  }
});

router.put('/:id', mw.validateUserId, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  try{
    const postUpdate = await Users.update(req.id, req.body)

    res.status(200).json(postUpdate)
  }  catch (error) {
    res.status(404).json(error.message)
  }
});

router.delete('/:id', mw.validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {

    const postRemove = await Users.remove(req.id)

    res.status(200).json(postRemove)

  } catch (error) {
    res.status(404).json(error.message)
  }
});

router.get('/:id/posts', mw.validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const getPost = await Users.getUserPosts(req.id)

    res.status(200).json(getPost)
  } catch (error){
    res.status(404).json(error.message)
  }
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const user = await Users.insert({text: req.body, user_id: req.params})

    res.status(200).json(user)
  } catch (error) {
    res.status(404).status(error.message)
  }
});

// do not forget to export the router
module.exports = router;