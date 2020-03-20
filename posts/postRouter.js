const express = require('express');

const Post = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Post.get(req.query)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    res.status(500).json({
      error: 'The user information could not be retrieved.'
    });
  });
});

//works on Postman

router.get('/:id', validatePostId, (req, res) => {
      res.status(200).json(req.post);
    }
);

//works on Postman

router.delete('/:id', validatePostId, (req, res) => {
  Post.remove(req.params.id)
    .then(post => {
        if (post > 0) {
            res.status(200).json({message: 'The post has been nuked'});
        } else {
            res.status(404).json({message: ' The post with the specified ID does not exist.'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The post could not be removed.'
        })
    })
});

//works on Postman
router.put('/:id', [validatePostId, validatePost], (req, res) => {
  const changes = req.body;
    Post.update(req.params.id, changes)
    res.status(200).json(req.post)
});

//works on Postman

// custom middleware


function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({message: 'Missing post data'})
  } else if (!req.body.text) {
    res.status(400).json({message: "missing required text field"})
  }
  next();
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  Post.getById(id)
  .then(post => {
    if(post) {
      req.post= post;
      console.log('req.post promise', req.post)
      next();
    } else{
      res.status(404).json({message: 'Post is not available.'})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'exception', err});
  })
  console.log('req.post', req.post)
}

module.exports = router;
