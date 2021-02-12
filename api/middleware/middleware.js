const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');

function logger (req, res, next) => {
  // do your magic!
  console.log(req.method, 'Request URL:', req.originalUrl, new Date().toUTCString())
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  const user = await Users.getById(id)

  try {
    if(!user){
      res.status(404).json({
        message: 'User not found'
      })
    } else {
      req.id = id
      req.user = user
      next()
    }
  } catch (error) {
    res.status(404).json(error.message)
  }
}

function validateUser(req, res, next) {
  // do your magic!
  const { name } = req.body

  if(!name) {
    res.stautus(400).json({
      message: 'name is required'
    })
  } else {
    req.name = name
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const { text } = req.body

  if (!text) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
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