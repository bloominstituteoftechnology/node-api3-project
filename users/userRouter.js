const express = require("express");

const db = require("../users/userDb.js");
const postDb = require("../posts/postRouter");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
  const newUser = req.body;

  db.insert(newUser)
    .then(brandNewUser => {
      if (newUser.id || newUser.name) {
        res.status(201).json(brandNewUser);
      } else {
        res.status(400).json({
          errorMessage: "Please proved an id and a name for the user"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving to the database"
      });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The users information could not be found"
      });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  const userId = req.params.id;

  db.getById(userId)
    .then(specificUser => {
      if (userId) {
        res.status(200).json(specificUser);
      } else {
        res.status(404).json({
          message: "The user with the specific ID does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The user information could not be retrieved"
      });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  const postId = req.params.id;

  db
    .getUserPosts(postId)
    .then(specificPost => {
      if (postId) {
        res.status(200).json(specificPost);
      } else {
        res.status(404).json({
          message: "The post with the specific ID does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The post information could not be retrieved"
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  const delId = req.params.id;

  db.remove(delId)
    .then(deletedUser => {
      if (!delId) {
        res.status(404).json({
          message: "The user with the specific ID does not exist"
        });
      } else {
        res.status(200).json({ deletedUser });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const usersId = req.params.id;
  const userBody = req.body;

  db.update(usersId, userBody)
    .then(updatedUser => {
      if (!usersId) {
        res.status(404).json({
          message: "The user with the specific ID does not exist"
        });
      } else {
        res.status(200).json({ updatedUser });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The user information could not be modified"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
