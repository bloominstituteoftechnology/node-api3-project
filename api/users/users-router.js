const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const Users = require('./users-model')
const Posts = require('../posts/posts-model')

const { validateUserId, validateUser, validatePost} = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .cactch(err => {
      next(err)
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

  try {
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.put('/:id', validateUser, validateUserId,  (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const changes = req.body
  const { id } = req.params
  const updatedUser = await Users.update(id, changes)

  res.status(201).json(updatedUser)
});

router.delete('/:id', validateUser, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try{
    const user = await Users.getById(req.params.id)
    res.status(200).json(user)
  }catch(err){
    res.status(500).json({message: 'something went wrong'})
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const {id} = req.params
  Users.getUserPosts(id)
  .then(messages => {
    res.status(200).json(messages)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error getting the posts for the user'})
  })
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// ERROR ENDPOINT
// ERROR ENDPOINT
// ERROR ENDPOINT
router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Error somewhere in there my dude',
    error: err.message
  });
})

// do not forget to export the router
module.exports = router;