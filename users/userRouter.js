const express = require('express');

const router = express.Router();

db = require('./userDb');
posts = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const { userName } = req.body;
  db.insert({ name: userName })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add user" })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  posts.insert({ user_id: req.params.id, text: req.body.text })
    .then(post => {
      res.status(200).json({ message: post })
    })
    .catch(error => {
      res.status(500).json({ message: "Could not post" })
    })
});


//do i need any middleware here?
router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({ message: "Couldn't get from Data base" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  db.getUserPosts(req.user.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      }
      else {
        res.status(400).json({ message: "This user has no posts" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Couldn't get posts" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  db.remove(req.user.id)
    .then(() => {
      res.status(200).json({ message: `user with id ${req.user.id} was removed` })
    })
    .catch(error => {
      res.status(500).json({ message: "Couldn't delete the user" })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  db.update(req.user.id, { name: req.body.name })
    .then(() => {
      db.getById(req.user.id)
        .then(user => {
          res.status(200).json(user);
        })
        .catch(error => {
          res.status(500).json({ message: "Could not get updated user." });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Could not update user." });
    });
});

//custom middleware



module.exports = router;
