const express = require('express');
const db = require('./userDb')



const router = express.Router();

router.use('/:id', validateUserId);

router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
  .then(data => {
    res.status(201).json(data);
  })
  .catch(err => res.status(500).json({message: 'internal server error'}))
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
  .then(data => {
    data ? res.status(200).json(data) : res.status(404).json({message: "There are currently no users"})
  })
  .catch(err => res.status(500).json({message: 'internal server error'}))
});

router.get('/:id', (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
  .then(data => {
    res.status(200).json(data)
  }) 
  .catch(err => res.status(500).json({message: "server error"}))
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then(data => {
    res.status(204).json(data)
  })
  .catch(err => res.status(500).json({message: "server error"}))
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
  if (Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" })
  } else if (!req.body.text){
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  } 
}

module.exports = router;
