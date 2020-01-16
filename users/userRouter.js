const express = require('express');

const router = express.Router();

const db = require('./userDb')

const postDB = require('../posts/postDb')

router.post('/', (req, res) => {
  db.insert(req.body)
  .then(hubs => {
    res.status(200).json(hubs)
    console.log(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user was not added"})
  })
});

router.post('/:id/posts', (req, res) => {
  postDB.update(req.params.id, req.body)
  .then(hubs => {
    res.status(200).json(hubs)
    console.log(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The post was not updated"})
  })
});

router.get('/', (req, res) => {
  db.get()
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be returned"})
  })
});

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be returned"})
  })
});

router.get('/:id/posts', (req, res) => {
  postDB.getById(req.params.id)
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be returned"})
  })
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be removed"})
  })
});

router.put('/:id', (req, res) => {
  db.update(req.params.id ,req.body)
  .then(hubs => {
    res.status(200).json(hubs)
    console.log(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user was not updated"})
  })
});

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
