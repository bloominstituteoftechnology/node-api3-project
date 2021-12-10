const Users = require("../users/users-model")

function logger(req, res, next) {
  console.log(req.method, req.url, req.timestamp)
  next()
}

const validateUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json({message: `User with id ${id} not found`})
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = req.body
    if (!user.name) {
      res.status(400).json({message:"name field is required"})
    } else {
      next()
    }
  }catch (err) {
    res.status(500).json({message: err.message})
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { postText } = req.body
    if (!postText) {
      res.status(400).json({message:"text is required"})
    } else {
      next()
    }
  }catch (err) {
    res.status(500).json({message: err.message})
  }
}

// do not forget to expose these functions to other modules

module.export = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}