const express = require("express");
const db = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  db.get(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "error retrieving posts", err });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json({ post });
      } else {
        res.status(404).json({ message: "ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Failed to load data", err });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!

  db.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to load data", err });
    });
});

// // custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  db.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: "ID does not exist, val" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "validator not working", err });
    });
}

module.exports = router;
