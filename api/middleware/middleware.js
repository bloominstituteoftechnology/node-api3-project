const User = require('../users/users-model')

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      next({ status: 404, message: 'user not found'})
    } else {
      req.user = user
      next()
    }
  } catch {
    res.status(500).json({
      message: 'No such user exists'
    })
  }
  
}

function validateUser(req, res, next) {
  const {name} = req.body
  if (!name || !name.trim()) {
    res.status(404).json({
      message: 'user not found'
    })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  const {text} = req.body
  if (!text || !text.trim()) {
    res.status(404).json({
      message: 'text not found'
    })
  } else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser,
  validatePost }