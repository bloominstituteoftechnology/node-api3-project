// PAYLOAD = The part of transmitted data that is the actual intended message = PAYLOAD \\




const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const User = require('./users-model')
const Post = require('../posts/posts-model')

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');
const { json } = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
      .then(users => 
        res.json(users)) //default status code is 200
      .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  //console.log('req.user -->', req.user)
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  //console.log(req.name)
  User.insert( {name: req.name} )
      .then( newUser => {
       // throw new Error('ouch')
        res.status(201).json(newUser)
      })
      .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  //easy because checks user legitimatcy automatically
  User.update(req.params.id, {name: req.name})
      .then( () =>{
        return User.getById(req.params.id)
      })
      .then(user=>{
        res.json(user)
      })
      .catch(next)
})



router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  //console.log('req.user -->', req.user)
  try {
    await User.remove(req.params.id)
    res.json(req.user)
  } catch(err) {
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  //console.log('req.user -->', req.user)
  try {
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch(err) {
    next(err)
  }
});
                                                                        //eslint disables red underline like from '..but was never read'
router.post('/:id/posts', validateUserId, validatePost, (req, res) => { //eslint-disable-line
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log('req.user -->', req.user)
  console.log('req.text -->', req.text)
});

router.use( (err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'something tragic inside posts router happened',
    errMessage: err.message,
    stack: err.stack
  })
})

// do not forget to export the router
module.exports = router