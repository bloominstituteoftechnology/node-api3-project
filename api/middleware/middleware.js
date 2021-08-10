const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.method} request for url: ${req.url} performed at ${Date.now()}`)
  next();
}

const validateUserId = async (req, res, next) => {
  const {id} = req.params;
  try{
    const user = await Users.getById(id)
    if(!user){
      res.status(404).json({message: 'User does not exist'})
    } else {
      req.user = user
      next();
    }
  }
  catch(err){
    res.status(500).json({message: "Error finding user"})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name){
    res.status(400).json({message: "missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json({message: "missing required text field"})
  } else{
    next();
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

// do not forget to expose these functions to other modules
