const express = require("express");
const router = express.Router();
const postsDB = require("../posts/postDb")
const usersDB = require("./userDb");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  console.log(req.body);
  usersDB
    .insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error adding user"
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  req.body.user_id = req.params.id;
  postsDB
    .insert(req.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  // do your magic!
  usersDB.get().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  usersDB
    .getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  usersDB
    .getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  usersDB
    .remove(req.params.id)
    .then(user => {
      res.status(200).json({ message: "user has been removed" });
    })
    .catch(err => {
      res.status(500).json({ message: "user wasnt removed" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  console.log(req.body);
  usersDB
    .update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error updating user"
      });
    });
});

//custom middleware
function validateUserId(req, res, next) {
  // do your magic!
  usersDB
    .getById(req.params.id)
    .then(user => {
      if (user.id) {
        req.user = user;
        console.log(req.user);
      } else {
        res.status(400).json({ message: "not a valid user id" });
      }
    })
    .catch(error => {
      res.status(400).json({ message: "invalid user id" });
    });
  next();
}

function validateUser(req, res, next) {
  // do your magic!
  req.body.name
    ? null
    : res.status(400).json({ message: "missing required name field" });
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  req.body.text
    ? null
    : res.status(400).json({ message: "missing required text field" });
}

module.exports = router;
