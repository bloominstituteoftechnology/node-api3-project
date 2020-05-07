const express = require('express');

const validateUserId = require('./middleware/validateUserID');
const validateUser = require('./middleware/validateUser');
const validatePost = require('./middleware/validatePost');

const Users = require('./userDb');
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: "an error occured while trying to create user"
      })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.user.id;
  Posts.insert(req.body)
    .then(posted => {
      return Posts.getById(posted.id)
        .then(post => {
          res.status(201).json(post)
        });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "an error occured while making new post"
      })
    })
});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("Error getting users from DB", err);
      res.status(500).json({
        message: "Error adding user DB"
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(404).json({
        errorMessage: "User with that ID does not exist"
      })
    })
});


router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error getting posts from that user"
      })
    });
});


router.delete('/:id', validateUserId, (req, res) => {
  Users
    .remove(req.user.id)
    .then(del => {
      res.status(200).json({
        message: `${req.user.name} was deleted`
      })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const id = req.user.id;
  Users.update(id, req.body).then(upd => {
    Users.getById(id).then(user => {
      res.status(200).json(user);
    })
      .catch(err => {
        res.status(500).json({
          error: "Error retrieving updated user"
        })
      });
  })
    .catch(err => {
      res.status(500).json({
        error: "Error updating user"
      });
    });
});

module.exports = router;
