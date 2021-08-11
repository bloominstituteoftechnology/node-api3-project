const express = require('express');

const {
  validateUserId, validateUser, validatePost

} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

const users = require('./users-model')

const post = require('../posts/posts-model');
const { response } = require('express');



router.get('/', (req, res, next) => {
  users.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)

});

router.get('/:id', validateUserId, validateUser, (req, res, ) => {
  res.json(req.user)
  

  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {

  users.insert({name: req.name})
  .then(newUser => {

    res.status(201).json(newUser)
  })
  .catch(next)
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id',   validateUserId, validateUser, (req, res, next) => {

  users.update(req.params.id, {name: req.name}).
  then(() => {
    return user.getById(req.params.id)
  })
  .then( user => {
    res.json(user)
  })
  .catch(next)
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',   validateUserId, (req, res, next) => {

  try {
    users.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, async (req, res, next ) => {
  try {
    const result = await users.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }

  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'was an error',
    message: err.message,
    stack: err.stack
  })
})

// do not forget to export the router
module.exports = router