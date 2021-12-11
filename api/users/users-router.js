const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const User = require('./users-model')
const Post = require('../posts/posts-model')

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
    try{
      const updatedUser = await User.update(req.params.id, req.body)
      res.status(201).json(updatedUser)
    } catch (err) {
      next(err)
    }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try{
    const user = await User.remove(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
  
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try{
    const result = await User.getUserPosts(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }

});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try{
    const result = await Post.insert({
      ...req.body,
      user_id: req.params.id,
      text: req.text,
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something went wrong',
    errorMessage: err.message,
    stack: err.stack
  })
})

// do not forget to export the router
module.exports = router;