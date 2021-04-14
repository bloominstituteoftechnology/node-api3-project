const users = require('../users/users-model')
const posts = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date().toISOString()
  console.log(`Made a ${req.method} to ${req.url} at ${time}`)

  next()
}

function validateUserId() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({
          message: "User not found"
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the user"
      })
    })
  }
}

function validateUser() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    if (!req.body.name) {
      res.status(400).json({
        message: "Missing required name field"
      })
    }

    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      res.status(400).json({
        message: "Missing required text field"
      })
    }

    next()
  }
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}