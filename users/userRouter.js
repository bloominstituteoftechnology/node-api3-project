const express = require('express');
const { request, response } = require('../server');
const userMethods = require("./userDb");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (request, response) => {
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

function validateUserId(request, response, next) {
  // do your magic!
  userMethods.findById(request.params.id)
    .then(userId => {
      if(userId) {
        request.user = userId;
        response.status(200).json(userMethods);
      } else {
        response.status(404).json({ message: "invalid user id" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "Error retrieving" })
    })

  next();
}

function validateUser(request, response, next) {
  // do your magic!
  if(request.body === undefined) {
    response.status(400).json({ message: "missing user data" });
  } else if (request.name === undefined) {
    response.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(request, response, next) {
  // do your magic!
  if(request.body === undefined) {
    response.status(400).json({ message: "missing user data" });
  } else if (request.body.text === undefined) {
    response.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

module.exports = router;
