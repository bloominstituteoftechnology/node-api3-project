function logger(req, res, next) {
  // DO YOUR MAGIC
  const {method,url, timestamp} = req
  console.log({
    method: method,
    url: url,
    timestamp: timestamp
  })
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