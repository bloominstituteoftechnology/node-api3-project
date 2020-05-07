const express = require("express");

const router = express.Router();

const Users = require("./userDb");
const PostDb = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((person) => {
      // console.log("person:", { person });
      res.status(200).json(person);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Error: "Error has occurred" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  let newPost = req.body;
  newPost.user_id = req.user.id;

  PostDb.insert(newPost)
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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
  Users.remove(req.user.id)
    .then((deleteThis) => {
      console.log(deleteThis);
      Users.get().then((personInfo) => {
        console.log(`Delete Success`);
        res.status(200).json(personInfo);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("");
    })
    .then();
});

router.put("/:id", validateUserId, (req, res) => {
  Users.update(req.user.id, req.body)
    .then((updated) => {
      console.log("put:", updated);
      Users.getById(req.user.id)
        .then((person) => {
          res.status(200).json(person);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ Errormessage: "Error is occurred" });
        });
    })
    .catch((err) => {
      res.status(500).json({ Error: "updated error occured" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then((person) => {
      if (person === undefined) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = person;
        // console.log("user?:", req.user);

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
