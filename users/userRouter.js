const express = require("express");
// const postRouter = require("/posts/postRouter.js");
const User = require("/postDb.js");
const router = express.Router();

// TODO add in the validateUser function, test
router.post("/", validateUser, (req, res) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: "Error adding the User."
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const postInfo = { ...req.body, post_id: req.params.id };
  User.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(error => {
      res.status(500).json({
        message: "Error getting the posts for this user."
      });
    });
});

router.get("/", (req, res) => {
  User.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving Users."
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  User.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "User not found."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving the User."
      });
    });
});

router.get("/:id/posts", validateUserId, validatePost, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        message: "Error getting the posts for the User."
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  User.remove(req.params.id).then(count => {
    if (count < 0) {
      res.status(200).json({
        message: "The User has been deleted."
      });
    } else
      res
        .status(404)
        .json({
          message: "The User could not be found."
        })
        .catch(error => {
          res.status(500).json({
            message: "Error removing the User."
          });
        });
  });
});

router.put("/:id", validateUserId, (req, res) => {
  User.update(req.params.id, req.body).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "The User could not be found."
      });
    }
  });
});

//custom middleware

// TODO logger()

// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API

// function logger(req, res, next) {
//   const { method, originalUrl } = req;
//   console.log(`${method} to ${originalUrl}`);

//   next();
// }

// TODO validateUserId()

// validateUserId validates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }

function validateUserId(req, res, next) {
  if (!id) {
    res.status(400).json({
      message: "Invalid user id."
    });
  } else {
    res.status(200).json(req.user);
    // TODO check if this is right
  }

  next();
}

// TODO validateUser()

// validateUser validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(404).json({
      message: "Missing user data."
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "Missing required name field."
    });
  }

  next();
}

// TODO validatePost()

// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "Missing post data."
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "Missing required text field"
    });
  }

  next();
}

module.exports = router;
