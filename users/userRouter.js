const express = require('express');
const { request, response } = require('../server');
const userMethods = require("./userDb");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUser, (req, res) => {
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
  userMethods.findById(request.params.id)
    .then(userId => {
      if(userId) {
        response.status(200).json(userMethods);
      } else {
        response.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "Error retrieving" })
    })
  next();
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
