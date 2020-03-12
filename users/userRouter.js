const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  Users.insert(req.body)
  .then( users => {
    res.status(200).json(users)
  })
  .catch( error => {
    res.status(500).json({"message": "the user could not be added"})
  })
});

router.post('/:id/posts', (req, res) => {
  const changes = req.body
  Users.update(req.params.id, changes)  
  .then( users => {
    res.status(200).json(users)
  })
});

router.get('/', (req, res) => {
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(users => {
    res.status(500).json({"message": "could not fetch any users"})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  const validId = req.user ? `${req.user}` : ""
  console.log(validId)
  Users.getById(validId)
    .then( users => {
      if(users){
        res.status(200).json(users)
      } else {
        res.status(404).json({"message": "the user by that Id could not be found"})
      }
    })
    .catch( error => {
      res.status(500).json({"message": "error retrieving the user"})
    })
});

router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
    .then( posts => {
      if(posts){
        res.status(200).json(posts)
      } else {
        res.status(404).json({"message": "no posts were found"})
      }
    })
    .catch( posts => {
      res.status(500).json({"message": "error retrieving posts"})
    })
});

router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(users => {
      if(users > 0){
        res.status(200).json(users);
      } else {
        res.status(404).json({ "message": "The user with the specified ID does not exist." })
      }
    })
    .catch(error => {
      res.status(500).json({
        "message": "Error deleting the user"})
    })
});

router.put('/:id', (req, res) => {
  const changes = req.body
  Users.update(req.params.id, changes)
  .then(users => {
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ "message": 'The user could not be found' });
    }
  })
  .catch(error => {
    res.status(500).json({
      "message": "Error adding the changes"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(user => {
    if(user){
      req.user = req.params.id;
      next();
    } else {
      res.status(400).json({ "message": "invalid user id" })
    }

  })
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
}

module.exports = router;
