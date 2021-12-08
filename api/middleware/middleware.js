function logger(req, res, next) {
  // DO YOUR MAGIC 
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timeStamp}] ${method} to ${url}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUserId middleware')
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost middleware')
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  validateUserId,
  validateUser,
  validatePost,
  logger,
}