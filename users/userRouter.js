const express = require('express');
const Users = require('../users/userDb')
const middlewares = require('../middlewares/middlewares')

const router = express.Router();

router.post('/', (req, res) => {
  Users.add(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user'
    });
  });
});

router.post('/:id/posts', (req, res, next) => {
  const userInfo = { ...req.body, user_id: req.params.id };

  Users.add(userInfo)
    .then(user => {
      res.status(210).json(user);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/', middlewares.validateUser, (req, res) => {
  Users.find(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users'
      });
    });
});

router.get('/:id', middlewares.validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', middlewares.validateUserId, (req, res) => {
    Users.findUserPosts(req.params.id)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error getting the posts from the user'
        });
      });
});

router.delete('/:id', middlewares.validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      count > 0
      res.status(200).json({ message: 'The user has been deleted' });
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the user'
      });
    });
});

router.put('/:id', middlewares.validateUserId, (req, res) => {
  const changes = req.body
  Users.update(req.params.id, changes)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the user',
      });
    });
});

module.exports = router;
