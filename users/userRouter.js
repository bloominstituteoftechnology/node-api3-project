const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");
const { post } = require("../posts/postRouter");
const router = express.Router();

router.post("/users", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not add user to database." });
    });
});

router.post("/users/:id/posts", validateUserId, validatePost, (req, res) => {
  let post = {
    text: req.body.text,
    user_id: req.params.id,
  };

  posts
    .insert(post)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      console.log(error);
      console.log(req.body);
      res.status(500).json({ error: "could not post comment" });
    });
});

router.get("/users", (req, res) => {
  users.get().then((user) => {
    res.status(200).json(user);
  });
});

router.get("/users/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/users/:id/posts", validateUserId, (req, res) => {
  users.getUserPosts(req.params.id).then((posts) => {
    res.status(200).json(posts);
  });
});

router.delete("/users/:id", validateUserId, (req, res) => {
  users.remove(req.params.id).then((user) => {
    res.status(200).json(user);
  });
});

router.put("/users/:id" ,validateUserId, validateUser,(req, res) => {
  // do your magic!
  
  
  users.update(req.params.id, req.body).then((newUser) => {
res.status(201).json(newUser);
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  users.getById(id).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "User ID does not exist " });
    }
  });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing Post data" });
  } else {
    next();
  }
  // do your magic!
}

module.exports = router;
