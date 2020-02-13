const express = require("express");
const post = require('../posts/postDb')
const vUserId = require("../data/middleware/validateUserId");
const vUser = require("../data/middleware/validateUser");
const vPosts = require("../data/middleware/validatePost");
const udb = require("../users/userDb");
const router = express.Router();

router.post("/", vUser, (req, res) => {
  // do your magic!
  res.status(200).json("YAY!");
});

router.post("/:id/posts", vUser, vUserId, vPosts, (req, res) => {
  // needs to use post db
  res.status(200).json("YAY!");
  // do your magic!
});

router.get("/", vUserId, (req, res) => {
  udb
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "beep beep boop?" });
    });

  // do your magic!
});

router.get("/:id", vUserId, (req, res) => {
  udb
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "beep beep boop?" });
    });
});

router.get("/:id/posts", vUser, vUserId, vPosts, (req, res) => {
  //will need post db
  // do your magic!
});

router.delete("/:id", vUserId, (req, res) => {
 udb.remove()
    .then(deathga => {
      res.status(200).json({
        message: "Delete Spell Critical Hit!!! It was Super Effective!"
      });
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
  // do your magic!
});

router.put("/:id", vUser, vUserId, (req, res) => {
  // do your magic!
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
