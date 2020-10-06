const express = require('express');


const users = require("./userDb");
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  console.log("req body", req.body);
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json("500 post error");
    })
  
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  // console.log("User get called", users);
  //Why/when does find have parameters? Also why is it get() in this instance
  users.get()
    .then((users) => {
      res.status(200).json(users);
    })
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
