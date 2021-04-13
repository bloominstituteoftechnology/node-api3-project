const users = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
}

function validateUserId(req, res, next) {
  users.getById(req.params.id)
    .then((user) => {
      if(user) {
        req.user = user
        next()
      } else {
        res.status(404).json({
          message: "User not found",
        })
      }
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  validateUserId,
}