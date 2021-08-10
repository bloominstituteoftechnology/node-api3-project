const User = require('../users/users-model.js');

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
      res.status(404).json(`no user with ${id}`)
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
    res.status(400).json("Name required")
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json("Text is required")
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