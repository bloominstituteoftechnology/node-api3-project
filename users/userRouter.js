const express = require('express');

const Hubs = './userDb.js';

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  const post = req.body;
  Hubs.insert(post)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({message: 'We could not find what you were looking for'});
    });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  const {id} = req.params;
  Hubs.getUserPosts(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json({message: `The id ${id} provided does not match`});
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Hubs.get()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({message: 'There is something wrong with url'});
    });
});

router.get('/:id', (req, res) => {
  // do your magic!
  Hubs.getById(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({message: `The provided id ${id} does not match`});
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Hubs.getUserPosts(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({message: `The provided id ${id} does not match`});
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
  // do your magic!
  Hubs.delete(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({message: `The provided id ${id} isincorrect`});
    });
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  // do your magic!
  Hubs.update(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({message: `The provided id ${id} isincorrect`});
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return function(req, res, next) {
    const realId = req.headers.id;
    if (realId === id) {
      next();
    } else {
      res.status(401).json({errMessage: 'Invalid user'});
    }
  };
}

function validateUser(req, res, next) {
  // do your magic!
  return function(req, res, next) {
    const body = req.body;
    const name = req.headers.name;

    if (!body) {
      res.status(400).json({errMessage: 'missing user data'});
    }
    if (!body.name) {
      res.status(400).jsons({errMessage: 'The given name does not match'});
    }
  };
}

function validatePost(req, res, next) {
  // do your magic!
  return function(req, res, next) {
    const body = req.body;
    if (!body) {
      res.status(400).json({errorMessage: 'Missing post data'});
    }
    if (!body.text) {
      res.status(400).json({errorMessage: 'Missing required text field'});
    }
  };
}

module.exports = router;
