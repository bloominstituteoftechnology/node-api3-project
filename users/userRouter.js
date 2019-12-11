const express = require('express');
const users = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const user = req.body;
  users
    .insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "there was an error saving user to db"
      });
    });
});

router.post("/:id/posts", [validatePost, validateUserId], (req, res) => {

});


router.get("/", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: " there was an error getting users"
      });
    });
});
router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;
  users
    .getUserPosts(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error retrieving user posts"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  users
    .remove(id)
    .then(records => {
      res.status(200).json({
        message: "user deleted"
      });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: " error deleting user"
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  users
    .update(id, changes)
    .then(records => {
      res.status(201);
    })
    .catch(error => {
      res.status(500).json({
        error: "there was an error updating records"
      });
    });
});
//custom middleware


function validateUserId(req, res, next) {
  const { id } = req.params;
  users
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          message: " invalid user id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "error processing request"
      });
    });
}

function validateUser(req, res, next) {
  const data = req.body;
  if (data && Object.keys(data).length === 0) {
    res.status(400).json({
      message: "missing user data"
    });
  } else if (!data.name) {
    res.status(400).json({
      message: "missing required name field"
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const data = req.body;
  if (data && Object.keys(data).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!data.text) {
    res.status(400).json({
      message: "missing required text field"
    });
  } else {
    next();
  }
}
module.exports = router;
