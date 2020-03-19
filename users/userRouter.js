const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.use(express.json());

router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({message: 'Error adding user.'});
    })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      if(users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({message: 'No Data, Post users first!'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Woops, something went wrong!'});
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;

  db.getById(id)
    .then(user => {
      if (!user) {
        res.status(400).json({message: 'Invalid User ID'});
      } else {
        req.user = user;
        next();
      };
    });
};

function validateUser(req, res, next) {
  const body = req.body;

  if (body.length === 0) {
    res.status(400).json({ message: 'Missing user data.'});
  };
  if (body.name === null) {
    res.status(400).json({ message: 'Missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;

  if (body.length === 0) {
    res.status(400).json({ message: 'Missing post data.'});
  };
  if (body.name === null) {
    res.status(400).json({ message: 'Missing required text field' });
  } else {
    next();
  }
}

module.exports = router;
