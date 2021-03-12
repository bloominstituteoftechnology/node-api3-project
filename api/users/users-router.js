const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  userdb.get()
        .then(users => res.status(200).json(users))
        .catch(err => {
          console.log('User GET error: ', err)
          res.status(500).json({error: 'Users unable to be retrieved'})
        })
});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  userdb.getUserPosts(req.params.id)
        .then(posts => res.status(200).json(posts))
        .catch(err => {
          console.log('error GETting user posts:', err)
          res.status(500).json({ errmessage: 'Posts unable to be retrieved' })
        })
})

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  userdb.insert(req.body)
        .then(user => {res.status(201).json(user)})
        .catch(err => {
          console.log('Unable to add user:', err)
          res.status(500).json({ errmessage: 'Error creating user' })
        })
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const userId = req.params.id

  userdb.update(userId, req.body)
        .then(() => {res.status(200).json({ message: 'User has been updated' })})
        .catch(err => {
          console.log('Error:', err)
          res.status(500).json({ errmessage: 'Error updating user' })
        })
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  userdb.remove(req.params.id)
        .then(user => res.status(200).json({ message: 'User deleted' }))
        .catch(err => {
          console.log('Deletion error:', err)
          res.status(500).json({ errmessage: 'User unable to be deleted' })
        })
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  userdb.getUserPosts(req.params.id)
        .then(posts => res.status(200).json(posts))
        .catch(err => {
          console.log('error getting user posts:', err)
          res.status(500).json({ errmessage: 'Posts unable to be retrieved' })
        })
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const userId = req.params.id
  const post = { ...req.body, user_id: userId }

  postdb.insert(post)
        .then(user => {res.status(201).json(user)})
        .catch(err => {
          console.log('Unable to create user post:', err)
          res.status(500).json({ errmessage: 'Unable to create post'})
        })
});

// do not forget to export the router
