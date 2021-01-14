const express = require('express');

const router = express.Router();

const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(() => {
      res.status(201).json({ message: `User ${id} has been deleted.` });
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Users.update(id, changes)
    .then(() => {
      res.status(200).json({ message: 'User has been update.' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

router.post('/:id/posts', validateUser, validatePost, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      Posts.insert(req.body)
        .then(post => {
          res.status(201).json({ message: 'New post created'})
        });
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
      
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server side error.' });
    });
});

// do not forget to export the router
module.exports = router;