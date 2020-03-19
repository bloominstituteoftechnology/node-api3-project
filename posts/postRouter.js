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

router.get('/:id', validatePostId, (req, res) => {
  const post_id = req.params.id;
  console.log(typeof post_id);
  Post.getById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The post information could not be retrieved.'
        })
    })
});

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

router.put('/:id', [validatePostId, validatePost], (req, res) => {
  const changes = req.body;
    Post.update(req.params.id, changes)
    .then(post => {
        if(post) {
            res.status(200),json(post);
        } else if (!post) {
            res.status(404).json({message: 'The post with the specified ID does not exist.'})
        } else {
            res.status(400).json({errorMessage: 'Please provide the text for the post.'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The post information could not be modified.'
        });
    });
});

// custom middleware


function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({message: 'Missing post data'})
  } else if (!req.body.text) {
    res.status(400).json({message: "missing required text field"})
  }
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  Post.getById(id)
  .then(post => {
    if(post) {
      req.post= post;
      next();
    } else{
      next(new Error('does not exist'));
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'exception', err});
  })
}

module.exports = router;
