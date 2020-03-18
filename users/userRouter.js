const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.use('/:id', validateUserId);

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
  .then(data => {
    data ? res.status(200).json(data) : res.status(404).json({message: "There are currently no users"})
  })
});

router.get('/:id', (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', validateUser, (req, res) => {
  db.update(req.params.id, req.body)
  .then(data => {
    res.status(201).json(data)
  })
  .catch(err => res.status(500).json({message: 'internal server error'}))
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then(data => {
      if (!data) {
        res.status(400).json({message: "invalid user id"})
      } else {
        req.user = data;
        next();
      }
    })
}

function validateUser(req, res, next) {
  if (Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" })
  } else if (!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  } 
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
