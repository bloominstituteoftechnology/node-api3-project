const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  const body = req.body;
  userDb.insert(body).then(user => {
    res
      .status(200)
      .json({ user })
      .catch(err => {
        res.status(500).json({ message: "Sorry, error occurred." });
      });
  });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  const body = req.body;
  postDb
    .insert(body)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).json({ message: "Could not add a post to that user." });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  const messageOfTheDay = process.env.MOTD || "Suh dude!";
  userDb
    .get()
    .then(data => {
      res.status(200).json({ motd: messageOfTheDay, data });
    })
    .catch(err => {
      res.status(500).json({ message: "Sorry there was an error" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  // do your magic!
  userDb
    .getById(id)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const userId = req.params.id;
  userDb
    .getUserPosts(userId)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      status
        .anchor(500)
        .json({ message: "We could not find that users posts by that id." });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userDb
    .remove(id)
    .then(user => {
      res.status(200).json({ message: `You deleted user ${id}` });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error deleteing that user!" });
    });
});
//running into some error here
router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  const body = req.body;
  const id = req.params.id;
  userDb
    .update(id, body)
    .then(updated => res.status(200).json({ updated }))
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error updateing that user." });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  // do your magic!
  userDb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user Id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body;
  if (body === {}) {
    res.status(404).json({ message: "missing user data" });
  } else if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  body.user_id = req.params.id;

  if (body === {}) {
    res.status(400).json({ message: "missing post data" });
  } else if (!body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
