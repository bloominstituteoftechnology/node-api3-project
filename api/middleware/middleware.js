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
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res.status(400).json({ message: "Please include text and user_id" });
  } else {
    Posts.insert(req.body)
      .then((post) => {
        req.newPost = post;
        next();
      })
      .catch((error) => {
        res.status(500).json({ error: "There was an error inserting post" });
      });
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  validatePostId,
  validatePost,
};
