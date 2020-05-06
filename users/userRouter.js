const express = require("express");

const router = express.Router();

const Users = require("./userDb");

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((person) => {
      console.log("person:", { person });
      res.status(200).json(person);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Error: "Error has occurred" });
    });
});

router.post("/:id/posts", validateUser, validateUserId, (req, res) => {
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
  if (req.body.name === undefined || req.body === null) {
    res.status(400).json({ message: "missing user data" });
  } else if (req.body.name === "" || req.body.name === null) {
    res.status(404).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (req.body.text === undefined || req.body === null) {
    res.status(400).json({ message: "missing user data" });
  } else if (req.body.text === "" || req.body.text === null) {
    res.status(404).json({ message: "missing required name field" });
  } else {
    next();
  }
}

module.exports = router;
