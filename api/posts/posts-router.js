const express = require('express');
const Posts = require('./posts-model')
const router = express.Router();
const { validatePostId }  = require('../middleware/middleware')

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then((post) => {
    console.log('posts work')
    res.status(200).json(post)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send('oops! Something went wrong') 
  })
});

router.get('/:id', validatePostId, (req, res) => {
  console.log('made it posts')
  res.status(200).json(req.post) 
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  Posts.remove(req.params.id)
  .then(post => {
    if(post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'post does not exist'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'error deleting'})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  const changes = req.body
  console.log('changes obj', changes)
  Posts.update(req.params.id, changes)
  .then(put => {
    if (put) {
      res.status(200).json(put)
    } else {
      res.status(404).json({ message: 'halfway there'})
    }
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'Error updating the adopter',
    });
  })
});

// do not forget to export the router

module.exports = router