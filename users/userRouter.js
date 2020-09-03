const express = require('express');

const router = express.Router();

const Users = require('./userDb');
const Posts = require('../posts/postDb')


router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.user)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((err) => {
    res.status(500).json({message: 'unable to submit data'})
  });
});

router.post('/:id/posts', validateUserId, (req, res) => {
  const newPost = { ...req.body, user_id: req.params.id };

  Posts.insert(newPost)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ message: 'unable to submit post data' });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: 'cannot fetch users' });
    });
});

router.get('/:id', (req, res) => {
  // do your magic!
Users.getById(req.params.id)
.then((user) => {
  res.status(200).json(user);
})
.catch((err) => {
  res.status(500).json({error: 'cannot fetch user'});
})
  
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((err) => {
    res.status(404).json({message: `posts for ${req.params.id} not found`})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then((deleted) => {
    res.status(201).json({message: `deleted user id: ${req.params.id}`}) 
  })
  .catch((err) =>{
    res.status(500).json({ error: 'error deleting user please try again'})
  })
});

router.put('/:id', (req, res) => {
  Users.update(req.params.id, req.body)
  .then((updatedUser) => {
    res.status(200).json({message: `updated user id ${req.params.id} for user ${updatedUser}`})
  })
  .catch((err) =>{
    res.status(500).json({message: `unable to update user. please try again.`})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;

  if (req.header.id === id) {
    next();
  } else {
    res.status(400).json({ message: 'invalid user id' });
  }
};

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!req.body.name) {
    res
      .status(400)
      .json({ message: 'missing required name field' });
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.text) {
    res
      .status(400)
      .json({ message: 'missing required text field' });
  }
  next();
};

module.exports = router;
