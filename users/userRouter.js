const express = require('express');
const Users = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id/posts', (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
    .then((user) => {
      res.status(204).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
