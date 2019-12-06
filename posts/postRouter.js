const express = require('express');

const router = express.Router();


const dbPost = require('./postDb')


router.get('/', (req, res) => {
  // do your magic!
  dbPost.get()
  .then(gets => {
    res.status(200).json(gets)
  })
  .catch(error => {
    res.status(500).json({ message: 'error getting posts', error})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  dbPost.getById(req.params.id)
  .then(gets => {
    res.status(200).json(gets)
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  dbPost.remove(req.params.id)
  .then(gone => {
    if(gone !== 0){
      res.status(200).json(gone)
    } else {
      res.status(404).json ({  message: "The user could not be found." })
    }
  })
  .catch(error => {
    res.status(500).json({ error, message: "Error deleting the user." })
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  
  dbPost.update(req.params.id, req.body)
  
  .then(puts => {
    res.status(201).json(puts)
  })
  .catch(error => {
    res.status(500).json({message: 'The post could not be updated'})
  
  })

});

// custom middleware

function validatePostId(req, res, next) {
//  do your magic!
  dbPost.getById(req.params.id)
    .then(post => {
      if (!post){
        res.status(400).json({ message: "invalid user id" })
      } else {
          req.post = post
      }next()
    })
    .catch(error => {
      res.status(500).json({message: 'There was an error getting post data from the database', error})
    })
}

module.exports = router;
