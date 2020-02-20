const express = require('express');
const posts = require("./postDb")
const router = express.Router();

router.get('/', (req, res, next) => {
  // do your magic!
  posts.get()
    .then( post => res.json(post))
    .catch(next)
});

router.get('/:id', validatePostId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId(), (req, res, next) => {
  // do your magic!
  posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "The post is deleted"
      })
    })
    .catch(next)
});

router.put('/:id', validatePostId(), (req, res, next) => {
  // do your magic!
  posts.update(req.params.id, req.body)
    .then(() => {
        res.status(200).json({
          message: "Post is updated"
        })
    })
    .catch(next)
});

// custom middleware

function validatePostId() {
  // do your magic!
  return (req, res, next) => {
    posts.getById(req.params.id)
      .then(post => {
        if(post) {
          req.post = post
          next()
        } else {
          res.status(404).json({
            message: "Post is not found"
          })
        }
      })
      .catch(next)
  }
}

module.exports = router;
