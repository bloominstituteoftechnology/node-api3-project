const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb');

const router = express.Router();

// POST Requests:
router.post('/', validateUser, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/:id/posts', validatePost, (req, res) => {
  res.status(200).json(req.userposts);
});

// GET Requests:
router.get('/', (req, res) => {
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving the Users.' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params;

  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Unable to retrieve posts' });
    });
});

// DELETE Requests:
router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(post => {
      res.status(200).json({ message: 'The User has been deleted' });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: 'The post could not be removed'
      });
    });
});

// PUT Requests

router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (!changes.name) {
    res.status(400).json({ message: 'Need to update the user name.' });
  } else {
    Users.update(id, changes)
      .then(update => {
        res.status(200).json(update);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Failed to update User name' });
      });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  console.log(id);
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ error: 'Invalid user ID.' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Server error validating user ID' });
    });
}

function validateUser(req, res, next) {
  const user = req.body;
  Users.insert(user)
    .then(users =>
      !users
        ? res.status(400).json({ error: 'no user' })
        : !user.name
        ? res.status(400).json({ error: 'invalid name' })
        : (req.users = users) & next()
    )
    .catch(error => {
      res.status(500).json({ error: 'Error adding User' });
    });
}

function validatePost(req, res, next) {
  const { id } = req.params;
  const user = { ...req.body, user_id: id };
  Posts.insert(user)
    .then(users =>
      !users & console.log(users)
        ? res.status(400).json({ error: 'no user' })
        : !user.text
        ? res.status(400).json({ message: 'missing post data' })
        : (req.userpost = users) & console.log(users, 'TEST') & next()
    )
    .catch(err => res.status(500).json({ error: 'error' }));
}

module.exports = router;