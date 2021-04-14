const user = require("../users/users-model")


function logger(format) {
  // DO YOUR MAGIC
  return (req, res, next) => {
    const time = new Date().toISOString()

    switch (format) {
      case "short":
    console.log(`${req.ip} made a ${req.method}`)
        break
      case "long":
    console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
        break
      default:
        return next("Error: Need a logger format")
    }
  next()
}
}

function validateUserId() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    user.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user
          next()
      } else {
        res.status(404).json({message: "user not found"})
      }
    })
    .catch((error) => {
      next(error)
    })
  }
}

function validateUser() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({message: "missing required name field"})
    }
      next()
  }
}

function validatePost() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({message: "missing required text field"})
    }
      next()
  }
}

// do not forget to expose these functions to other modules


module.exports = {
  logger, validateUserId, validateUser, validatePost
}