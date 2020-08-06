const express = require("express");
const postDB = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  postDB
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  const postID = req.params.id;

  postDB
    .getById(postID)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({ message: "Invalid post id." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const postID = req.params.id;

  postDB
    .remove(postID)
    .then((post) => {
      if (post) {
        res.status(204).end();
      } else {
        res.status(400).json({ message: "Invalid post id." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
