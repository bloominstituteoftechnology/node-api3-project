const users = require("../users/users-model")

const logger = (format) => {
  return (req, res, next) => {
    const time = new Date().toISOString()
  
    switch(format) {
      case "short":
        console.log(`${req.ip} ${req.method} ${req.url} ${time}}`)
      case "long":
          console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}}`)
    }

    next()
  }
}

const validateUserId = () => {
  return(req, res, next) => {
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
      .catch(next)
  }
}

const validateUser = () => {
  return(req, res, next) => {
    if (!req.body.name) {
			return res.status(400).json({
				message: "Missing user name",
			})
		}

		next()
  }
}

const validatePost = () => {
  return(req, res, next) => {
  // DO YOUR MAGIC
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser
}