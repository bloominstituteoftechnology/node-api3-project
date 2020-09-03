const express = require('express');
const Users = require("./userDb"); 
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert({name:req.body.name})
  .then(res => {
    res.status(201).json(res); 
  })
  .catch(err => {
    console.log(err); 
    res.status(500).json({ errorMessage: "User could not be added" }); 
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
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

router.get('/:id', (req, res) => {
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id; 
  Users.remove(id)
  .then(user => {
    res.status(200).json(user.id)
  })
  .catch(err => {
    console.log(err)
    res.status(404).json({ errorMessage: "User with this id could not be deleted" }); 
  })
});

router.put('/:id', (req, res) => {
  // do your magic!

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Users.getById(id)
  .then(user => {
    if(user){
      req.user === user; 
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
}

module.exports = router;
