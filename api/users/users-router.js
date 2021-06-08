const express = require('express');
const users = require('./users-model.js')
const posts = require('./../posts/posts-model.js')

const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware.js');

// module.exports = {
//   get,
//   getById,
//   getUserPosts,
//   insert,
//   update,
//   remove,
// };

const router = express.Router();

router.get('/', logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS 
  // res.status(200).json([{ test: 'test' }]);
  users.get(req.query)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'Error recieving message'});
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
  console.log('This works!')
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'Could not update user'})
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'Could not update user'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  users.remove(req.params.id)
  .then(() => {
    res.status(201).json(users)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
    message: 'Error removing the hub',
    });
  });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  posts.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message:'Could not retrieve users posts'})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  const newPostInfo = {...req.body, id: req.params.id}
  posts.insert(newPostInfo)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'Error returning the new post'})
    })
});


module.exports = router;