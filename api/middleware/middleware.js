const User = require('../users/users-model.js')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.url, req.method)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { id } = req.params
    const user = await User.getById(id)
    if(!user){
      res.status(404).json("user not found")
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name){
    res.status(400).json("missing required name field")
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json("missing required text field")
  } else {
    next()
  }
}

module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost
}  
// do not forget to expose these functions to other modules
