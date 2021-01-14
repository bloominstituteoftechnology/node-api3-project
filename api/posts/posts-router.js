const express = require("express");

const router = express.Router();

const Posts = require("./posts-model");

const { validatePostId, validatePost } = require("../middleware/middleware");

router.get("/", (req, res) => {
  Posts.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: error, message: "There was an error returning posts " });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  Posts.remove(id)
    .then(() => {
      res.status(200).json({ message: "Post deleted" });
    })
    .catch(() => {
      res.status(500).json({ message: "Error deleting post" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.update(id, req.body)
    .then((post) => {
      console.log(post);
      res.status(200).json({ message: "Successfully modified" });
    })
    .catch(() => {
      res.status(500).json({ message: "Error Modifying Post" });
    });
});

module.exports = router;
