const express = require('express');

const router = express.Router();

const Users = require('./users-model');

const { validateUserId, validateUser } = require('../middleware/middleware');

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(() => {
      res.status(201).json({ message: `User ${id} has been deleted.` });
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
});

// do not forget to export the router
module.exports = router;