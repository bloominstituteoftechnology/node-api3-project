const express = require('express');

const Db = require('../posts/postDb')

const router = express.Router();

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Db.getById(req.params.id)
  .then(posts => {
    (posts) ? res.status(200).json({ message: 'post id validated'}) : res.status(400).json({ message: 'invalid post id' })
  })
  next()
}

function validateUserId(req, res, next) {
  // const userId = req.params.id
  Db.getById(req.params.id)
  .then(user => {
  (user) ? res.status(200).json({ message: 'user id validated'}) : res.status(400).json({ message: "invalid user id" })
  })
  next()
}

function validateUser(req, res, next) {
// const user = req.body
(req.body) ? res.status(200).json({ message: 'user validated' }) : res.status(400).json({ message: "missing user data" })
(req.body.name) ? res.status(200).json({ message: 'user validated' }) : res.status(400).json({ message: "missing required name field" })

next()
}

function validatePost(req, res, next) {
// const userPost = req.body
(req.body) ? res.status(200).json({ message: 'post validated' }) : res.status(400).json({ message: "missing post data" })
(req.body.text) ? res.status(200).json({ message: 'post validated' }) : res.status(400).json({ message: "missing required text field" })
next()
}


router.get('/', validatePost, validateUser, (req, res) => {
  // do your magic!
  Db.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({
      message: "There was an error fetching posts.", err
    })
  })
});

router.get('/:id', validateUserId, validatePostId, (req, res) => {
  // do your magic!
  Db.getById(req.params.id)
  .then(posts => {
    (posts) ? res.status(200).json(posts) : res.status(404).json({ message: `This post with the id, ${req.params.id} doesn't exist`})
  })
  .catch(err => {
    res.status(500).json({error: 'This post info could not be found', err})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Db.remove(req.params.id)
  .then(posts => {
    (posts) ? res.status(200).json({ message: `This post with the id, ${req.params.id} has been removed.`}) : res.status(400).json({ message: 'This post cannot be removed. '})
  })
});

router.put('/:id', (req, res) => {
  const changes = req.body
  // do your magic!
  Db.update(req.params.id, changes)
  .then(posts => {
    (posts) ? res.status(200).json(posts) : (!changes.text) ? res.status(400).json({errorMessage: "Please provide title and contents."}) : res.status(404).json({message: `This post with the id, ${req.params.id} doesn't exist.`})
  })
  .catch(err => {
    res.status(500).json({error: "The post info could not be changed.", err})
  })
});


module.exports = router;
