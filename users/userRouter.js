const express = require("express");
const post = require("../posts/postDb");
const vUserId = require("../data/middleware/validateUserId");
const vUser = require("../data/middleware/validateUser");
const vPosts = require("../data/middleware/validatePost");
const udb = require("../users/userDb");
const router = express.Router();

router.post("/", vUser, (req, res) => {
  const { body } = req;

  udb.insert(body).then(newUser => {
    res.status(200).json(newUser);
  });
});

router.post("/:id/posts", vUserId, vPosts, (req, res) => { //THIS ONE TOO!
  const { body } = req;

  post.insert(body).then(newPost => {
    res.status(200).json(newPost);
  });
});

router.get("/", (req, res) => {
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
  const { id } = req.params;
  udb
    .getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "beep beep boop?" });
    });
});

router.get("/:id/posts", vUserId, vPosts, (req, res) => { //THIS ONE
  const { id } = req.params;
  // const { body } = req;
  post.getById(id)
 .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "beep beep boop?" });
    });
});

router.delete("/:id", vUserId, (req, res) => {
  const { id } = req.params;
  udb
    .remove(id)
    .then(deathga => {
      console.log("Delete Spell Critical Hit!!! It was Super Effective!");
      res.status(200).json(deathga);
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
  // do your magic!
});

router.put("/:id", vUser, vUserId, (req, res) => {
  const { id } = req.params;
  const { body } = req;
  udb
    .update(id, body)
    .then(updatega => {
      console.log("Update Spell Critical Hit!!! It was Super Effective!");
      res.status(200).json(updatega);
    })
    .catch(err => {
      status(404).json({ message: "Booooooop? " });
    });
});

//custom middleware

module.exports = router;
