const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/:id/posts', validateUserId, (req, res) => {
  Posts.insert(req.body)
    .then((post) => {
      console.log(post);
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  console.log(req.user);

  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: 'test' });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then((user) => {
      res.status(204).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  const content = req.body;
  Users.update(id, content)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//custom middleware
function validateUserId(req, res, next) {
  const id = req.params.id;
  const promise = Users.getById(id);
  promise.then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'Invalid user id' });
    }
  });
}

function validateUser(req, res, next) {
  if (req.body) {
    next();
  } else {
    res.status(400).json({ message: 'Missing user data' });
  }
}

function validatePost(req, res, next) {
  if (req.body.text) {
    next();
  } else {
    res.status(400).json({ message: 'missing required text field' });
  }
}

module.exports = router;
