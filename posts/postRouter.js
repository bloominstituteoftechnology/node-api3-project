const express = require("express");
const posts = require("./postDb");
const validatePost = require("../middleware/validatePost");
const router = express.Router();

// router.post("/", validatePost(), (req, res, next) => {
//   posts
//     .insert(req.body)
//     .then((post) => res.status(201).json({ post }))
//     .catch((err) => res.status(500).json({ message: err }));
// });

router.get("/", (req, res) => {
  // do your magic!
  posts
    .get()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => err.status(500).json({ message: err }));
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
