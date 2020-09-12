const express = require('express');
const userMethods = require("./userDb");
const postMethods = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userMethods.insert(req.body)
    .then(user => {
      res.status(201).json(req.body);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was a server error saving the user to the database"
      })
    })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const {
    id
  } = req.params;
  userMethods.getById(id)
    .then(user => {
      req.body.user_id = id;
      postMethods.insert(req.body)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          console.log(err)
          res.status(404).json({
            message: "user does not exist"
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was a server error while trying to save the post"
      })
    })
});

router.get('/', (req, res) => {
  userMethods.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "There was a server error retrieving the users"
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const {
    id
  } = req.params;
  userMethods.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: `User with id ${id} does not exist.`
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was a server error retrieving the user from the database."
      })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const {
    id
  } = req.params
  userMethods.getUserPosts(id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({
          message: `User with id ${id} does not exist`
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was a server error retrieving the user's posts"
      })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  const {
    id
  } = req.params;
  userMethods.remove(id)
    .then(userId => {
      if (userId) {
        res.status(200).json(userId)
      } else {
        res.status(400).json({
          message: `User with id ${id} does not exist`
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "There was a server error deleting the user"
      })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const {
    id
  } = req.params;
  userMethods.update(id, req.body)
    .then(changes => {
      if (changes) {
        res.status(200).json(req.body)
      } else {
        res.status(404).json({
          message: "The user with the specified id could not be edited"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "There was a server error updating the user"
      })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // validates the user id on every request that expects a user id parameter
  // if id is valid --> store object as req.user
  // if id is !valid --> cancel request and respond with status 400 and { message: "invalid user id" }
  const {
    id
  } = req.params;
  userMethods
    .getById(id)
    .then((userId) => {
      if (userId) {
        req.user = userId;
      } else {
        res.status(400).json({
          message: "ivalid user id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "There was an error retrieving the user",
      });
    });

  next();
}

function validateUser(req, res, next) {
  // validates the body on a request to create a new user
  // if !req.body --> cancel request with status 400 and { message: "missing user data" }
  // if req.body missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
  if (!req.body) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  }

  next();
}

function validatePost(req, res, next) {
  // validates body on request to create a new user
  // if !req.body, cancel and respond with status 400 and { message: "missing user data" }
  // if req.body missing required text field, cancel and respond with status 400 and { message: "missing required text field" }
  if (!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  }
  next();
}

module.exports = router;