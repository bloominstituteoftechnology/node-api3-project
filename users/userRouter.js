const express = require("express");
const validateUserID = require("./validateUserIdMW");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  let newUser = req.body;

  Users.insert(newUser)
    .then((response) => {
      return res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

router.post("/:id/posts", validateUserID, validatePost, (req, res) => {
  let newPost = req.body;

  Posts.insert(newPost)
    .then((response) => {
      console.log(response);
      return res.status(201).json(response);
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .json({ message: "there was an issue saving the post" });
    });
});

router.get("/", (req, res) => {
  Users.get({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/:id", validateUserID, (req, res) => {
  let requestedUser = req.params.id;

  Users.getById(requestedUser)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "problem retrieving user" });
    });
});

router.get("/:id/posts", validateUserID, (req, res) => {
  let requestedUser = req.params.id;

  Users.getUserPosts(requestedUser)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "error retrieving this user's posts" });
    });
});

router.delete("/:id", validateUserID, (req, res) => {
  // do your magic!
});

router.put("/:id", validateUserID, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    return res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  let userID = req.params.id;

  req.body.user_id = userID;

  if (!req.body) {
    return res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    return res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
