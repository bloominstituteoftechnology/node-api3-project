const express = require('express');

const PostDb = require('./postDb')
const dbConfig = require('../data/dbConfig') 
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  PostDb.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  PostDb.getById(req.params.id)
    .then(post => {
      res.status(200).json({ data: post })
    })
    .catch(err => {
      console.log(err)
    })
});



router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  PostDb.remove(req.params.id)
  .then(count => {
    res.status(200).json({ message: "The post has been deleted!" });
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
        message: "Error deleting the post",
    });
  });
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  PostDb.update(req.params.id, req.body)
  .then(post => {
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: "The post could not be found" });
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
        message: "Error updating the post",
    });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  PostDb.getById(req.params.id)
    .then(post => {
      if(post){
        req.post = post
        next()
      } else {
        res.status(400).json({ message: 'invalid post id' })
      }
    })
}

module.exports = router;
