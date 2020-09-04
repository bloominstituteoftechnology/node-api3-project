const express = require('express');
const Users = require("./userDb"); 
const Posts = require("../posts/postDb"); 
const e = require('express');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body;
  Users.insert(newUser)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log(err); 
    res.status(500).json({ errorMessage: "User could not be added" }); 
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const newPost = req.body; 
  Posts.insert(newPost)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(err => {
    console.log(err); 
    res.status(500).json({ errorMessage: "Post could not be added"})
  })
  
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(404).json({ errorMessage: "Resource not found" }); 
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id; 
  Users.getById(id)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Error finding a user with this id" })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic! 
  Users.getUserPosts(req.user.id)
  .then(posts => {
    res.status(200).json(posts); 
  })
  .catch(err => {
    console.log(err); 
    res.status(500).json(err.message); 
  })
});
//? is this right?
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id; 
  Users.remove(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({ errorMessage: "User with this id could not be deleted" }); 
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const changes = req.body; 
  Users.update(req.params.id, changes)
  .then(updated => {
    res.status(201).json(updated);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Cannot update user" }); 
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  
  Users.getById(id)
  .then(user => {
    if(user){
      req.user = user; 
      next(); 
    } else {
      res.status(400).json({ errorMessage: "Invalid User Id" }); 
    }
  })
  .catch(err => {
    res.status(404).json(err); 
  })
}

function validateUser(req, res, next) {
  // do your magic!
  // grab (define) the variables to check against 
  const body = req.body; 
  const name = req.body.name; 
  if (!body){
    res.status(400).json({ errorMessage: "Missing user data" }); 
  } else if (!name){
    res.status(400).json({ errorMessage: "Missing required name field" }); 
  } else {
    next(); 
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ errorMessage: "Missing post data" }); 
  } else if(!req.body.text){
    res.status(400).json({ errorMessage: "Missing text input field" }); 
  } else {
    req.body.user_id = req.user.id; 
    next(); 
  }
}

module.exports = router;
