const Users = require('../users/users-model.js')
const Posts = require('../posts/posts-model.js')

function logger(req, res, next) {
  console.log(`${req.method}, ${req.url}, ${Date.now()}`)
  next()
}

const validateUserId = async (req, res, next)=> {
  try{
    const { id } = req.params
    const user = await Users.getById(id)
    if(!user){
      res.status(404).json({message: "user not found"})
    }else{
      req.user = user
      next()
    }
  }catch(err){
    res.status(500).json({message: `Error: ${err.message}`})
  }
}

function validateUser(req, res, next) {
  if(!req.body.name){
    res.status(400).json({message: 'missing required name field'})
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body.text){
    res.status(400).json({message: 'missing required text field'})
  }else{
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost }
