const posts = require('../posts/posts-model')

const user = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC

  try {
    const user = user.getbyID(req.params.id)
    if(!user) {
      res.status(404).json({
        message: 'no such user'
      })
    } else {
      req.user = user

      next()
    } 
  } catch (err) {
    res.status(500).json ({
      message: 'problem finding user'
    })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC

  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    req.name = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
logger,
validateUserId,
validateUser,
validatePost

}