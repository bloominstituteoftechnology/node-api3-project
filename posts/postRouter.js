const express = require('express');
const posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  posts
    .get()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: "could not find all posts", err }));

});

router.get('/:id', validatePostId(), (req, res) => {
  posts.getById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({message: 'could not find posts with this ID', err}))
  });



router.delete('/:id', validatePostId(), (req, res) => {
  posts.remove(req.params.id)
  .then(post => {
    res.status(200).json({message:`post has been deleted`})
  })
  .catch(err => res.status(404).json({errorMessage: `cannot delete post`, err}))
});

router.put('/:id', validatePostId(), validatePost(), (req, res) => {
  posts
    .update(req.params.id, req.text)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: "could not update post", err }));
});

// custom middleware

function validatePost() {
  return (req, res, next) => {
    resource = {
      text: req.body.text
    }

    if(!req.body.text){
      return res.status(404).json({errorMessage: `missing post data `})
    } else {
      req.text = resource
      next()
    }
  }
}

function validatePostId() {
  return (req, res, next) => {
 
  posts.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({message: `post ID not found `})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'server error, cannot find post', err });
    })}
  
}

module.exports = router;
