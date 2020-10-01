const express = require('express');
const userMethods = require("./userDb");
const postMethods = require("../posts/postDb");
const router = express.Router();


router.post('/', validateUser, (request, response) => {
  // do your magic!
  userMethods.insert(request.body)
    .then(user => {
      response.status(201).json(request.body);
    })
    .catch(error => {
      response.status(500).json({ message: "There was a server error saving the user to the database" });
    })
});

router.post('/:id/posts', validatePost, (request, response) => {
  // do your magic!
  const { id } = request.params;

  userMethods.getById(id)
    .then(user => {
      request.body.user_id = id;
      postMethods.insert(request.body)
        .then(post => {
          response.status(201).json(post);
        })
        .catch(error => {
          console.log(error);
          response.status(404).json({ message: "user does not exist" });
        })
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "There was a server error while trying to save the port" })
    })
});

router.get('/', (request, response) => {
  // do your magic!
  userMethods.get()
    .then(users => {
      response.status(200).json({users})
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "There was a server error retrieving the users" })
    })
});

router.get('/:id', validateUserId, (request, response) => {
  // do your magic!
  const { id } = request.params;
  userMethods.getById(id)
    .then(user => {
      if (user) {
        response.status(200).json(user)
      } else {
        response.status(404).json({ message: `User with id ${id} does not exist.`})
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "There was a server error retrieving the user from the database." });
    })
});

router.get('/:id/posts', validateUserId, (request, response) => {
  // do your magic!
  const { id } = request.params;
  userMethods.getUserPosts(id)
    .then(posts => {
      if (posts) {
        response.status(200).json(posts);
      } else {
        response.status(400).json({ message: `User with id ${id} does not exist`})
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "There was a server error retrieving the user's posts" })
    })
});

router.delete('/:id', validateUserId, (request, response) => {
  // do your magic!
  const { id } = request.params;
  userMethods.remove(id)
    .then(userId => {
      if(userId) {
        response.status(200).json(userId);
      } else {
        response.status(400).json({ message: `User with id ${id} does not exist`})
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "There was a server error deleting the user" })
    })
});

router.put('/:id', (request, response) => {
  // do your magic!
  const { id } = request.params;
  userMethods.update(id, request.body)
    .then(changes => {
      if (changes) {
        response.status(200).json(changes);
      } else {
        response.status(400).json({ message: `User with id ${id} does not exist`});
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({ message: "There was a server error updating the user" })
    })
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
