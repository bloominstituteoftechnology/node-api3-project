const express = require("express");
const Post = require("./posts-model");
const router = express.Router();
const { validatePostId } = require("../middleware/middleware");
router.get("/", async (req, res) => {
    const posts = await Post.get();
    res.json(200).json(posts);
});

router.get("/:id", validatePostId, async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
});

// do not forget to export the router
module.exports = router;