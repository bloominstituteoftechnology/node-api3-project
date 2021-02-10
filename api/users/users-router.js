const express = require("express");
const User = require("./users-model");
const Post = require('../posts/posts-model')
const router = express.Router();
const {
    validateUserId,
    validatePost,
    validateUser,
} = require("../middleware/middleware");

router.get("/", async (req, res) => {
    try {
        const users = await User.get();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({
            message: "The posts information could not be retrieved",
        });
    }
});

router.get("/:id", validateUserId, async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
});

router.post("/", validateUser, async (req, res) => {
    const newUser = await User.insert(req.body);
    res.status(201).json(newUser);
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
    const update = req.body;
    const { id } = req.params;
    const userUpdated = await User.update(id, update);
    userUpdated
        ? res.status(200).json({ ...update, id })
        : res.status(500).json({
              message: "The post information could not be modified",
          });
});

router.delete("/:id", validateUserId, async (req, res) => {
    const { id } = req.params;
    const postDeleted = await User.delete(id);
    postDeleted
        ? res.status(200).json(id)
        : res.status(500).json({ message: "The post could not be removed" });
});

router.get("/:id/posts", validateUserId, async (req, res) => {
    const { id } = req.params;
    const posts = await User.findCommentById(id);
    res.status(200).json(posts);
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const { id } = req.params;
    const post = {...req.body, userId: id};
    const postAdded = Post.insert(post)
    res.status(200).json(postAdded)
    
});

module.exports = router;
