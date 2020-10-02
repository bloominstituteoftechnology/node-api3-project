const express = require('express');
const postMethods = require("../posts/postDb");
const router = express.Router();

router.get('/', (request, response) => {
  // do your magic!
  postMethods.get()
    .then(posts => {
      response.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "Error retrieving the post" });
    })
});

router.get('/:id', validatePostId, (request, response) => {
  // do your magic!
  const { id } = request.params;
  postMethods.getById(id)
    .then(post => {
      if (post) {
        response.status(200).json(post)
      } else {
        response.status(404).json({ message: `User with id ${id} does not exist.`})
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "There was a server error retrieving the post from the database." });
    })
});

router.delete('/:id', validatePostId, (request, response) => {
  // do your magic!
  const { id } = request.params;
  postMethods.remove(id)
    .then(post => {
      response.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "There was a server error retrieving the post from the database." });
    })
});

router.put('/:id', validatePostId, (request, response) => {
  // do your magic!
  const { id } = request.params;
  postMethods.update(id, request.body)
    .then(post => {
      if(request.body === undefined) {
        response.status(400).json({ message: "Missing information"})
      } else {
        response.status(200).json(post);
      }
    })
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
