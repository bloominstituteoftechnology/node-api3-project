const express = require("express");

const Users = require("./userDb.js");
const Posts = require("../users/userDb.js");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Posts.insert(req.post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" });
    });
  // do your magic!
});

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({
        error: "The users information could not be retrieved"
      });
    });
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(error => {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ errorMessage: "The users information could not be retrieved" });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
  // do your magic!
});

router.put("/:id", (req, res) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({
        message: "Error updating the user"
      });
    });
  // do your magic!
});

//custom middleware

module.exports = router;

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      if (!user) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = user;
        next();
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ error: "there was an error getting users" });
    });
  next();
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  const { id } = req.params;
  const post = { ...req.body, user_id: id };
  if (!post) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
    next();
  }
}
