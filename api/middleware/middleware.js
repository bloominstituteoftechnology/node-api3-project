const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  // do your magic!
}

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: `Post with ID ${id} does not exist` });
      } else {
        req.post = post;
        next();
      }
    })
    .catch((error) => {
      res.status(500).json({ err: error, message: "Internal server error" });
    });
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
  const { text } = req.body;
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    req.validatedPost = req.body;
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  validatePostId,
  validatePost,
};
