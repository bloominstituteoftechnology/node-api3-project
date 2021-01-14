const { restart } = require("nodemon");
const Post = require('../posts/posts-model');
const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`
    [${new Date().toISOString()}]: ${req.method} at ${req.baseUrl}${req.url}
  `);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) 
      res.status(404).json({ message: "user not found" });
    else {
      res.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing required name field" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing user data" });
  } else {
    next();
  }
}

async function validatePostId(req, res, next) {
  try {
    const post = await Post.getById(req.params.id);
    if (!post) 
      res.status(404).json({ message: "post not found" });
    else {
      res.post = post;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing required text field" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing post data" });
  } else {
    next();
  }
}

function serverErrorHandler(err, req, res, next) {
  res.status(500).json({
    info: 'Internal server problem',
    message: err.message,
    stack: err.stack
  });
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePostId,
  validatePost,
  validateUserId,
  validateUser,
  serverErrorHandler
}