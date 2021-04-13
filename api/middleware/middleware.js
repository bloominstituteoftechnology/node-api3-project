const user = require("../users/users-model")


function logger(req, res, next) {
  // DO YOUR MAGIC
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

function validatePost(req, res, next) {
  // DO YOUR MAGIC

}

// do not forget to expose these functions to other modules
