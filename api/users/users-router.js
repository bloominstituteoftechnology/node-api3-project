const express = require('express')
const Users = require('../users/users-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware.js')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params
  User.getById(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});

router.post('/', validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Post.insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const changes = req.body;
  User.update(req.params.id, changes)
  .then(user => {
    if(user){
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'The user could not be found' })
    }
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const id = req.params.id
  User.remove(id)
  .then(() => {
    res.status(200).json({ message: 'User has been deleted' })
  })
  .catch(error => {
    res.status(500).json({ message: error.message})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    res.status(500).json({ message: 'Error getting posts from user' })
  })
});

router.post('/:id/posts', (req, res) => {
});

module.exports = router
// do not forget to export the router
