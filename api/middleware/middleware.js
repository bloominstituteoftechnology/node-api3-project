const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  // console.log('logger middleware');
  console.log(`[${timeStamp}] ${method} to ${url}`);
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  // console.log('validateUserId middleware');
  try { 
    const user = await User.getById(req.params.id)
    if(!user){
      res.status(404).json({
        message: 'No such user'
      })
    }else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({
        message: 'Problem finding user'
      })
  }
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware');
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePosts middleware');
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost
}  