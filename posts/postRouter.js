const express = require('express');
const postdb = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postdb.get()
  .then((post) => {
    res.status(200).json(post)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id', validatePostId(), (req, res) => {
  // do your magic!
      res.status(200).json(req.user)
})

router.delete('/:id', validatePostId(), (req, res) => {
  // do your magic!
  postdb.remove(req.params.id)
  .then((post) => {
    res.status(200).json({
      message: "The post has been deleted."
    })
  })
  .catch((error) =>{
    next(error)
  })
});

router.put('/:id', validatePostId(), (req, res) => {
  // do your magic!
  postdb.update(req.params.id, req.body)
  .then((post) => {
    res.status(200).json(post)
  })
  .catch((error) => {
    next(error)
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    postdb.getById(req.params.id)
    .then((post) => {
      if (post) {
        req.user = post
        next()
      } else {
        res.status(404).json({
          message: "Post Id does not exist"
        })
      }
    })
    .catch((error) => {
      next(error)
    })
  }
}

module.exports = router;
