const { validateUserId, validateUser, validatePost } = require('../../middleware/users-mw')
const express = require('express')
const User = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router()


//#########################################################################################################################################
// ------------------------------------------------------------------ |
//                             Create                                 |
// ------------------------------------------------------------------ |

// Create new user
router.post('/', validateUser, (req, res, next) => {
  const { name } = req.body

  User.insert({ name })
  .then(user => {res.status(201).json(user)})
  .catch(err => {res.status(500).json({error: 'An internal server error occurred when creating the new user.'})})
})

// Create new post by users ID
router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  const { id: user_id } = req.params
  const { text } = req.body

  Posts.insert({ user_id, text })
    .then(post => {res.status(201).json(post)})
    .catch(err => {res.status(500).json({ error: 'An internal server error occurred while creating the new post.'})})
})

//#########################################################################################################################################
// ------------------------------------------------------------------ |
//                             Read                                   |
// ------------------------------------------------------------------ |

// Get full users list
router.get('/', (req, res, next) => {
  User.get()
  .then(users => {res.status(200).json(users)})
  .catch(err => {res.status(500).json({error: 'An internal server error occurred while getting users.'})})
})

// Get user by users ID
router.get('/:id', validateUserId, (req, res, next) => {
  const { id } = req.params

  User.getById(id)
  .then(users => {
    if(!users) {
      res.status(404).json({error: `The user with ID: ${id} could not be found.`})
    } else {
      res.status(200).json(users)
    }})
  .catch(err => {res.status(500).json({error: 'An internal server error occurred while getting the user.'})})
})

// Get users posts by users ID
router.get('/:id/posts', validateUserId, (req, res, next) => {
  const { id } = req.params

  User.getUserPosts( id )
  .then(posts => {
    if(!posts) {
      res.status(204).json({message: `The user with ID: ${id} has no posts.`})
    } else {
      res.status(200).json(posts)
    }
  })
  .catch(err => {res.status(500).json({error: 'An internal server error occurred while getting the users posts.'})})
})

//#########################################################################################################################################
// ------------------------------------------------------------------ |
//                             Update                                 |
// ------------------------------------------------------------------ |

// Update user by users ID
router.put('/:id', validateUserId, (req, res, next) => {
  const { id } = req.params
  const { name } = req.body

  User.update( id, {name} )
  .then(update_user => {
    if(!update_user) {
      res.status(404).json({message: `A user with the ID: ${id} does not exist.`})
    } else {
      User.getById( id )
      .then(found_user => {
        res.status(200).json(found_user)
      })
      .catch(err => {res.status(500).json({error: 'An internal server error occurred while getting the user.'})})
    }
  })
  .catch(err => {res.status(500).json({error: 'An internal server error occurred while updating this user.'})})
})

//#########################################################################################################################################
// ------------------------------------------------------------------ |
//                             Delete                                 |
// ------------------------------------------------------------------ |

// Delete user by users ID
router.delete('/:id', validateUserId, (req, res, next) => {
  const { id } = req.params

  User.remove( id )
  .then(() => {
    res.status(200).json({message: 'User removed successfully.'})
  })
  .catch(err => {res.status(500).json({error: 'An internal server error occurred while removing the user.'})})
})


module.exports = router