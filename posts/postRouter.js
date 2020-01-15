const express = require('express');

const Posts = require('./postDb.js')


const router = express.Router();

// works
router.get('/', (req, res) => {
  // do your magic!

  // console.log('adding', user)
  Posts.get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retreived." })

    })

});

// works
router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  let id = req.params.id
  Posts.getById(id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be retrieved." })

    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// works
router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  console.log('the id exists')
  let id = req.params.id
  let post = req.body

  Posts.update(id, post)
    .then(updatedPost => {
      console.log('updated')
      res.status(200).json(updatedPost)
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be modified." })

    })

});

// custom middleware

// do we not need to validate the post for the put?

function validatePostId(req, res, next) {
  // do your magic!

  let id = req.params.id
  Posts.getById(id)
    .then(post => {
      // console.log(user)
      // not used anywhere
      req.post = post
      next()
    })
    .catch(err => {
      res.status(400).json({ message: "invalid user id" })
    })

}


module.exports = router;
