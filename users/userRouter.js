const express = require('express');
const Data = require("./userDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Data.insert(req.body)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        messge: "There was an error while saving the post to the database",
      });
    });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  Data.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving posts",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  console.log(req.u);
  res.status(200).json(req.u);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Data.getUserPosts(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error processing request",
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Data.remove(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "The user could not be removed" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  Data.update(req.params.id, req.body)
    .then(res.status(200).json(req.body))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error processing request" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Data.getById(id)
    .then((u) => {
      if (u) {
        req.u = u;
        next();
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  !body || body === {}
    ? res.status(400).json({ message: "user not included" })
    : !body.name
      ? res.status(400).json({ message: "missing name" })
      : next();
}
function validatePost(req, res, next) {
  const body = req.body;
  !body || body === {}
    ? res.status(400).json({ message: "post not included" })
    : !body.text
      ? res.status(400).json({ message: "missing text" })
      : next();
}

module.exports = router;