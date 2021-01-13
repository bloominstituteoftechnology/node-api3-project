const { restart } = require("nodemon");
const Post = require('../posts/posts-model');

function logger(req, res, next) {
  console.log(`
    [${new Date().toISOString()}]: ${req.method} at ${req.url}
  `);
  next();
}

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
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
  // do your magic!
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


  serverErrorHandler
}