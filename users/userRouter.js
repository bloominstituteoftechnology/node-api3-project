const express = require('express');
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const db = require('./userDb');

const router = express.Router();

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

router.post('/', validateUser, (req, res) => {
  console.log(req.body)
    db.insert(req.body)
      .then(user => {
        res.status(200).json(user);
      })

      .catch(error => {
        res.status(500).json({error: "Error saving user to the database"}, error)
      })
});


  

router.post('/:id/posts', validateUser, (req, res) => {
  console.log(req.params)
 
  db.insert(req.params.id)
  .then(post => {
    console.log(post);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  })
  .catch( error => {
    console.log(error)
    res.status(500).json({
      message: 'error retriveing that post'
    })
  })
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



function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
