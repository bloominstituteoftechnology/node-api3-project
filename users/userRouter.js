const express = require("express");

const Users = require("./userDb");
const Posts = require("../posts/postDb"); 

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // working

  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      console.log(req.body);
      res.status(500).json({ error: "could not post user" });
    });
});

router.post("/:id/posts",[validateUserId, validatePost], (req, res) => {
  // working

  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      console.log(req.body); 
      res.status(500).json({ error: "could not post comment" });
    });

});

router.get("/", (req, res) => {
  //working

  Users.get()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "could not get users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {

    Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "could not get users" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  //working

  Users.getUserPosts(req.user.id)
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "could not get posts" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  //working

  Users.remove(req.user.id)
    .then((recordsDeleted) => {
      res.status(200).json({ recordsDeleted });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "could not delete user" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // working

  Users.update(req.user.id, req.body)
    .then((recordsUpdated) => {
      res.status(200).json({ recordsUpdated });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "could not update user" });
    });
});

// validateUserId()

// validateUserId validates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }

function validateUserId(req, res, next) {
  const id = req.params.id;

  Users.getById(id)
    .then((userObject) => {
      if (userObject) {
        req.user = userObject;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "could not validate ID" });
    });
}

// validateUser()

// validateUser validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } 

  next();

}

// validatePost()

// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }

function validatePost(req, res, next) {

      if (!req.body) {
        res.status(400).json({ message: "missing post data" });
      } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" });
      } 
  
      next();
  
}

module.exports = router;
