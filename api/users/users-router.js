const express = require('express');


const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then(usersList => {
      res.status(200).json(usersList);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving the users'});
    });
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving the user'});
    });
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error adding the user'});
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error updating the user'});
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then( () => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error deleting the user'});
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then( userPosts => {
      res.status(200).json(userPosts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error retrieving the users posts'});
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.params.id; 
  Posts.insert(req.body)
    .then(newPost => {
      res.status(200).json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error adding the post'});
    });
});

module.exports = router;
