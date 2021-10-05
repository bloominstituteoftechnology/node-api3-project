const express = require('express');
const User = require('./users-model.js')
const Post = require('../posts/posts-model.js')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware.js')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  User.get()
    .then(users => {
      res.status(500).json(users)
    })
    .catch(err => {
      res.status(422).json({ message: 'Error retrieving all users' })
    })

  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user)
}
)

router.post('/', validateUser, (req, res) => {
  const newUser = req.body;
  User.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const changes = req.body
  User.update(req.user.id, changes)
    .then(updatedUser => {
      res.status(201).json(updatedUser)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res) => {
  // User.remove(req.user.id)
  //   .then(deletedUser => {
  //     res.status(201).json(deletedUser)
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: err.message })
  //   })

  const { id } = req.user;
  let deletedUser;
  User.getById(id)
    .then((res) => {
      deletedUser = res;
    })
    .then(User.remove(id)
      .then(() => {
        res.status(200).json(deletedUser)
      }))
    .catch(err => {
      console.log(err)
    })


  // try {
  //   const deletedUser = await User.remove(req.user.id);

  // }
  // catch (err) {


  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params;
  User.getUserPosts(id)
    .then(posts => {
      res.status(500).json(posts)
    })
    .catch(err => {
      res.status(400).json(err)
    })

  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const { id } = req.user;
  const newPost = req.body;
  Post.insert(newPost)
    .then(post => {
      res.status(201).json(newPost)
    })
    .catch(err => {
      res.status(400).json(err)
    })
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;
// do not forget to export the router
