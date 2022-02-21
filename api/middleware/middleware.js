const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.url, req.method)

  next()
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC

  try {
    const {id} = req.params

    const user = await Users.getById(id)

    if(!user) {
      res.status(404).json({ message: "user not found" })
    } else {
      res.status(200).json(user)
      req.user = user
      next()
    }

  } catch(err) {
    res.status(500).json({message: err.message})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = req.body
  
    if(!user.name) {
      res.status(400).json({message: 'Missing required name field'})
    } else {
      res.status(200).json(user)
      next()
    }
  } catch(err) {
    res.status(500).json({message: err.message})
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  try{
    const { text } = req.body
    if(!text){
      res.status(400).json({message: 'Missing required text field'})
    }else{
      next()
    }
  }catch(err){
    res.status(500).json({message: err.message})
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}