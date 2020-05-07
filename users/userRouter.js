const express = require("express");
const db = require("./userDb");
const router = express.Router();

router.post("/", (req, res) => {
  db.insert(req.body)
    .then((newUsers) => {
      res.status(200).json(newUsers);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error, message: "Can not make new user" });
    });
}); // working !!

router.post("/:id/posts", (req, res) => {
  db.insert(req.body)
    .then((newPost) => {
      res.status(200).json(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error, message: "Can not make new post" });
    });
}); // not working!!!

router.get("/", (req, res) => {
  db.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(404).json({ message: "Can not find data" });
    });
}); // working!!

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error, message: "Can not get user" });
    });
}); // working

router.get("/:id/posts", (req, res) => {
  db.getUserPosts(req.params.id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error, message: "Can not get user" });
    });
}); // working

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The User has been deleted" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "error removing user",
      });
    });
}); // working baby!

router.put("/:id", (req, res) => {
  const { id } = req.params;
  db.update(id, req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error, message: "Could not edit user" });
    });
}); // not working!!

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  db.getById(id);
  if (user) {
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
