function logger(req, res, next) {
  console.log(`Time Stamp: ${new Date.toISOString()}, Request Method: ${req.method}, Request URL: ${req.url}`);

  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules


module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}