const express = require('express');

const router = express.Router();
const Users = require('./userDb.js');
const Posts = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body).then(user => {
    res.status(200).json(user);
  });
  // res.send(req.body);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const postInfo = { ...req.body, user_id: req.params.id };

  Posts.insert(postInfo).then(post => {
    res.status(210).json(post);
  });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not find the users' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id).then(post => {
    res.status(200).json({ post });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id).then(user => {
    if (user) {
      Users.remove(req.params.id)
        .then(count => {
          if (count) {
            res.status(200).json(user);
          }
        })
        .catch(err => console.log(err));
    }
  });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body).then(user => {
    res.status(200).json(req.body);
  });
});

//custom middleware
function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'This User is not found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error retreiving the user' });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;
  if (user) {
    if (user.name) {
      next();
    } else {
      res.status(400).json({ erroMessage: 'Insert a proper name' });
    }
  } else {
    res.status(400).json({ erroMessage: '' });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body;
  if (post) {
    if (post.text) {
      next();
    } else {
      res.status(400).json({ erroMessage: 'Insert a proper text' });
    }
  } else {
    res.status(400).json({ erroMessage: '' });
  }
}

module.exports = router;
