const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
  .then(posts => {
    posts 
      ? res.status(200).json(posts) 
      : res.status(404).json({error: "Fellowship not found"})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "Error on our side, sorry"})
  })
});


router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});


router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.post.id)
    .then(() => {
      res.status(200).json(req.post);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "Error on our side, sorry"})
    })
});


router.put('/:id', validatePostId, (req, res) => {
  const id = req.post.id;
  const body = req.body;

  Posts.update(id, body)
    .then(() => {
      res.status(200).json(body);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "Error on our side, sorry"})
    })
});


// custom middleware

function validatePostId(req, res, next) {
  const {id} = req.params;

  Posts.getById(id)
    .then(post => {
      req.post = post
      post === undefined
      ? res.status(404).json({error: "Not found by that id"})
      : next()
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "Error on our side, sorry"})
    })
}

module.exports = router;