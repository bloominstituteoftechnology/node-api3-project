const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users
  .insert(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({ error: 'error adding user' })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const post = { ...req.body, user_id: req.params.id };
  Posts.insert(post)
    .then(post => {
      console.log(post);
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error adding post" });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Users
  .get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => res.status(404).json({ errorMessage: "error retrieving users" }));
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Users.getById(id)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'error retrieving user by id' })
  })
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Posts.getById(id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'error retrieving posts'})
  })
});

router.get("/posts/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  Users
    .getUserPosts(id)
    .then(userposts => {
      res.status(200).json(userposts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errormessage: "error getting all posts by user id" });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Users.remove(id)
  .then(removed => {
    res.status(200).json(removed)
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'error removing user by id' })
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const updates = req.body;
  Users.update(id, updates)
  .then(updated => {
    res.status(404).json(updated)
  })
  .catch(err => {
    res.status(500).json({ errorMessage: 'error updating the user' })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Users.getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' })
    }
  })
  .catch(err  => {
    res.status(500).json({ error: 'The user information could not be retrieved'})
  })
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;
    if (!user) {
      res.status(400).json({ message: 'missing user data' })
    } else if (!user.name) {
    res.status(400).json({ message: 'missing required name field' })
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body;
    if (!post) {
      res.status(400).json({ message: 'missing post' })
    } 
    if(!post.text) {
      res.status(400).json({ message: 'missing required text field' })
    }
  // console.log('Post validated');
  next();
}

module.exports = router;
