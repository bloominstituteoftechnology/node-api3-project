const express = require('express');
const Users = require("./userDb.js");
const router = express.Router();



router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(newUser => {
    res.status(201).json(newUser)
  })
  .cath(error => {
    console.log(error)
    res.status(500).json({message: "there was an issue adding user."})
  })
});

router.post('/:id/posts', (req, res) => {
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
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
