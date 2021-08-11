const Users = require('../users/users-model.js')

const logger = (req, res, next) => {
  console.log(`
    method: ${req.method}
    endpoint: ${req.url}
    timestamp: ${req.timeStamp}
  `)
  next()
}

const validateUserId = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await Users.getById(id)
    if ( ! user) {
      res.status(404)
        .json({ message: 'user not found' })
    } else {
      req.user = user
    }
    next()
  } catch {
    res.status(500)
      .json({ message: 'SERVER ERROR retrieving user' })
  }
}

const validateUser = (req, res, next) => {
  next()
}

const validatePost = (req, res, next) => {
  next()
}

module.exports = {
  logger, validateUserId, validateUser, validatePost,
}
