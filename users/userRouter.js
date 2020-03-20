/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb');
const { validateUserBody, validateUserId, validatePostBody } = require('../middleweare/mwFunctions');

const router = express.Router();

router.post('/', validateUserBody, (req, res) => {
  const userInfo = req.body;
  Users.insert(userInfo)
    .then((user) => {
      res.status(201).json({ success: true, user });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'There was an error while saving the user to the database', err });
    });
});

router.post('/:id/posts', validatePostBody, validateUserId, (req, res) => {
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
    .catch((err) => {
      res.status(500).json({ error: 'There was an error while saving the post to the database', err });
    });
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error retrieving the users', err,
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error retrieving the user', err });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json({ success: true, post });
    })
    .catch((err) => {
      res.status(500).json({ error: 'The posts information could not be retrieved.', err });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'The user has been deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the user', err });
    });
});

router.put('/:id', validateUserId, validateUserBody, (req, res) => {
  const { id } = req.params;

  Users.update(id, req.body)
    .then((user) => {
      res.status(200).json({ success: 'Info Updated!', info: req.body, user });
    })
    .catch((err) => {
      res.status(500).json({ error: 'I cannot provide any info from the inner server, try again!', err });
    });
});

module.exports = router;
