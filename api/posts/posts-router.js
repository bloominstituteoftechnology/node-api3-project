const express = require("express");
const Post = require("./posts-model");
const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
    Post.get()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/:id", mw.validatePostId, (req, res) => {
    const id = req.params.id;
    Post.getById(id)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// do not forget to export the router

module.exports = router;
