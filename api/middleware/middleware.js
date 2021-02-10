const User = require("../users/users-model");
const Post = require("../posts/posts-model");

function logger(req, res, next) {
    console.log(`[${new Date().toUTCString()}] ${req.method} to ${req.url}`);
    next();
}

async function validateUserId(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.getById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            req.user = user;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: " Server error: " + err });
    }
}
async function validatePostId(req, res, next) {
    const { id } = req.params;
    try {
        const post = await Post.getById(id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        } else {
            req.post = post;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: " Server error: " + err });
    }
}

function validateUser(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" });
    } else {
        next();
    }
}

function validatePost(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "missing post data" });
    } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        next();
    }
}

// do not forget to expose these functions to other modules

module.exports = {
    logger,
    validateUser,
    validatePost,
    validateUserId,
    validatePostId,
};
