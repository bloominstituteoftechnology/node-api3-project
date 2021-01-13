const { restart } = require("nodemon");

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

function validatePostId(req, res, next) {
  // do your magic!
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

  serverErrorHandler
}