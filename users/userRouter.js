const express = require("express");

const router = express.Router();

const Users = require("./userDb");

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  Users.get()
    .then((person) => {
      res.status(200).json(person);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retreieving the posts",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then((article) => {
      if (article === undefined || article === "") {
        res
          .status(404)
          .json({ Error: "This user doesn't seem to have any posts made" });
      } else {
        res.status(200).json(article);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: "error has occured" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then((person) => {
      if (person === undefined) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = person;
        next();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "error occured" });
    });
}

function validateUser(req, res, next) {
  Users.get(req.body);
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
