const express = require('express');
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const db = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
      .then(user => {
        res.status(200).json(user);
      })

      .catch(error => {
        res.status(500).json({error: "Error saving user to the database"}, error)
      })
});

router.post('/:id/posts', validateUSer (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
if (req.body){
  if(!req.body.name){
  res.status.json({message: "missing required name field"});
} else {
  next();
   } 
} else {
  res.status(400).json({message: "missing user data"})
   }
}


function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
