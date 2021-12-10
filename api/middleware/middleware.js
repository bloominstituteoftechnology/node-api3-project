function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}