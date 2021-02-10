
const User = require("../users/users-model");
const Post = require("../posts/posts-model");
const logger = (req, res, next) => {
    console.log(req);
    console.log(
        `Method: ${req.method}, URL: ${
            req.url
        },time: ${new Date().toISOString()}`
    );
    next();
};

const validateUserId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.getByID(id);
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (e) {
        res.status(500).json({ message: e });
    }
};

const validatePostId = async (req, res, next) => {
  const { id } = req.params;
  try {
      const post = await Post.getByID(id);
      if (post) {
          req.post = post;
          next();
      } else {
          res.status(404).json({ message: "post not found" });
      }
  } catch (e) {
      res.status(500).json({ message: e });
  }
};

const validateUser = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: "missing required name field" });
    } else if (!req.body.name) {
        res.status(400).json({ message: "missing user data" });
    } else {
        next();
    }
};

const validatePost = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: "missing post data" });
    } else if (!req.body.text) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        next();
    }
};

module.exports = {
    logger,
    validateUserId,
    validatePostId,
    validateUser,
    validatePost,
};
