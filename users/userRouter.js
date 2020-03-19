/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const userInfo = req.body;
  Users.insert(userInfo)
    .then((user) => {
      res.status(201).json({ success: true, user });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an error while saving the user to the database', err });
    });
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  const userid = req.params.id;
  const { text } = req.body;

  Users.getById(userid)
    .then((post) => {
      if (!post) {
        null;
      } else {
        const newPost = { text, userid };
        Posts.insert(newPost)
          .then((postnew) => res.status(201).json({ success: postnew }));
      }
    })
    .catch((err) => res.status(500).json({ error: 'There was an error while saving the post to the database', err }));
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the users', error,
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving the user', error });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json({ success: true, post });
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'The posts information could not be retrieved.', err });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'The user has been deleted' });
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error removing the user', error });
    });
});

router.put('/:id', [validateUserId, validatePost], (req, res) => {
  const { id } = req.params;

  Users.update(id, req.body)
    .then((user) => {
      res.status(200).json({ success: 'Info Updated!', info: req.body, user });
    })
    .catch((err) => {
      res.status(500).json({ error: 'I cannot provide any info from the inner server, try again!', err });
    });
});

// custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'Invalid user ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Invalid user ID 500', err });
    });
}

function validateUser(req, res, next) {
  const { name } = req.body;

  Object.entries(req.body).length === 0
    ? res.status(400).json({ message: 'No User Data' })
    : !name
      ? res.status(400).json({ message: 'Missing required name field' })
      : next();
}

function validatePost(req, res, next) {
  const { text } = req.body;

  Object.entries(req.body).length === 0
    ? res.status(400).json({ message: 'No User Data' })
    : !text
      ? res.status(400).json({ message: 'Missing required name field' })
      : next();
}

module.exports = router;
