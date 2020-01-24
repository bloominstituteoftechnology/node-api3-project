const express = require('express');

const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const user = req.body;
  userDb.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error adding user" })
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const post = req.body;

  console.log(post);

  postDb.insert(post)
    .then(post => {
      console.log(post);
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error adding post" });
    });
});

router.get('/', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  userDb.getById(id)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving user" });
    });
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;

  postDb.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving posts" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  userDb.remove(id)
    .then(num => {
      console.log(num);
      res.status(200).json({ message: "user successfully removed" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "could not delete user" });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  userDb.update(id, changes)
    .then(count => {
      if(count == 1) {
        res.status(200).json(changes);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error updating the user" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userDb.getById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: "invalid user id" })
    });
};

function validateUser(req, res, next) {
  const body = req.body;
  
  if(!body) {
    res.status(400).json({ message: "missing user data" })
  };

  if(!body.name) {
    res.status(400).json({ message: "missing required name field" })
  };
  
  next();
}

function validatePost(req, res, next) {
  const post = req.body;

  if(!post) {
    res.status(400).json({ message: "missing post data" })
  };

  if(!post.text) {
    res.status(400).json({ message: "missing required text field" })
  };

  next();
}

module.exports = router;
