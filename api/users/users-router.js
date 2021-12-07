const express = require('express');
const mw = require('../middleware/middleware')
const Posts = require('../posts/posts-model');
const Users = require('./users-model');

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Error retrieving users'});
  });
});

router.get('/:id',mw.validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'Error retrieving user'});
    })
});

router.post('/',mw.validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'Error creating user'});
    })
});

router.put('/:id',mw.validateUserId,mw.validateUser, (req, res) => {
  Users.update(req.params.id,req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'Error updating user'});
    })
});

router.delete('/:id',mw.validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user =>{
      Users.remove(req.params.id)
        .then(users => {
          res.status(200).json(user)
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({message: 'Error deleting user'});
        })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'Error retrieving user'});
    })
});

router.get('/:id/posts',mw.validateUserId, (req, res) => {
  const postArray = [];
  Posts.get()
  .then(posts => {
    posts.forEach(post =>{
      if(post.user_id == req.params.id) {
        postArray.push(post)
      }
    })
    res.status(200).json(postArray)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Error retrieving posts'});
  })
});

router.post('/:id/posts',mw.validateUserId, mw.validatePost, (req, res) => {
  const newPost = req.body
  newPost.user_id = req.params.id
  Posts.insert(newPost)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Error adding post'});
  })
});

module.exports = router;