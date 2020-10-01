const express = require('express');
const userMethods = require("./userDb");
const postMethods = require("../posts/postDb");
const router = express.Router();

router.get('/', (request, response) => {
  // do your magic!
});

router.get('/:id', (request, response) => {
  // do your magic!
});

router.delete('/:id', (request, response) => {
  // do your magic!
});

router.put('/:id', (request, response) => {
  // do your magic!
});

// custom middleware

const validatePostId = (request, response, next) => {
  // do your magic!
  const { id } = request.params;
  postMethods.getById(id)
    .then(post => {
      if(post) {
        request.post = post;
        next();
      } else {
        response.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "Error retrieving the user" });
    })
}

module.exports = router;
