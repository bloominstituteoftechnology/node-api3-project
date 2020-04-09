const express = require('express');

const Posts = require('../posts/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Could not retrieve the posts.' });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.posts);
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Posts.remove(id)
    .then(post => {
      res.status(200).json({ message: 'The post has been deleted.' });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'The post could not be recovered.' });
    });
});


// This updates a post for a specific user by the PostID number not the user ID
router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;
  if (!changes.text) {
    res.status(400).json({ message: 'Need to update the posts text.' });
  } else {
    Posts.update(id, changes)
      .then(update => {
        res.status(200).json(update);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Failed to update Post.' });
      });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  console.log('id', id);
  Posts.getById(id)
    .then(post => {
      if (post) {
        req.posts = post;
        next();
      } else {
        res.status(400).json({ error: 'Invalid' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: 'Server error validating post ID' });
    });
}

module.exports = router;