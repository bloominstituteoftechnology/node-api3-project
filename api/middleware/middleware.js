
const User = require('../users/users-model')

function  logger(req, res, next) { //ctrl + d
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleDateString()
  const method = req.method
  const url = req.originalUrl
  console.log('logger middleware')
  //console.log(`this is the req object: ${req}`)
  //console.log(req)
  console.log(`timestamp ${timestamp} method ${method} to url ${url}`)
  next()
}

async function validateUserId(req, res, next) { // interact. w DB => make async
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: "no such user",
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user"
    })
  }

  // DO YOUR MAGIC
  console.log('validateUserId middleware')
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost middleware')
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost, 
}
