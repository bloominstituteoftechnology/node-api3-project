const express = require("express");
const User = require("./users-model");
const Post = require("../posts/posts-model");
const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
    User.get()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/:id", mw.validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.post("/", mw.validateUser, (req, res) => {
    User.insert(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.put("/:id", mw.validateUser, mw.validateUserId, (req, res) => {
    const id = req.params.id;
    User.update(id, req.body)
        .then(() => {
            res.status(200).json({ id, name: req.body.name });
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

router.delete("/:id", mw.validateUserId, (req, res) => {
    const id = req.params.id;
    User.remove(id).then(() => {
        res.status(200).json({ message: "user deleted" });
    });
});

router.get("/:id/posts", mw.validateUserId, (req, res) => {
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
    const id = req.params.id;
    User.getUserPosts(id)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

router.post("/:id/posts", mw.validatePost, mw.validateUserId, (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const id = req.params.id;
    Post.insert({ user_id: id, text: req.body.text })
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

// do not forget to export the router

module.exports = router;
