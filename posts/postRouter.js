const express = require("express");

//db Post
const Post = require("./postDb");

const router = express.Router();

//working... Did this with an async approach
router.get("/", async (req, res, next) => {
  // do your magic!
  try {
    const allPosts = await Post.get(req.body);
    res.status(200).json(allPosts);
  } catch (err) {
    next(err);
  }
});

//working...
router.get("/:id", validatePostId, async (req, res, next) => {
  // do your magic!
  try {
    res.status(200).json(req.post);
  } catch (err) {
    next(err);
  }
});

//working...
router.delete("/:id", validatePostId, async (req, res, next) => {
  // do your magic!
  try {
    const deletePost = await Post.remove(req.post.id);
    res.status(200).json(deletePost);
  } catch (err) {
    next(err);
  }
});

//working...
router.put("/:id", validatePostId, async (req, res, next) => {
  // do your magic!
  try {
    const updatePost = await Post.update(req.post.id, req.body);
    res.status(200).json(updatePost);
  } catch (err) {
      console.log(req.body);
    next(err);
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Post.getById(id).then(postId => {
    if (postId) {
      req.post = postId;
      next();
    } else {
      res.status(404).json({ message: "invalid post id" });
    }
  });
}

module.exports = router;
