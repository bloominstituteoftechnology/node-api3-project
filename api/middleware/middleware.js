const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.url)
  next()
}

function validateUserId(req, res, next)  {
  // DO YOUR MAGIC
  
    const userId = req.params.id
    const user = User.getById(userId)
    if(!user){
      res.status(404).json(`No user with this ${userId}`)
    }else{
      req.User = user
      next()
    
  }
  
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const newUser = req.body
  if(!newUser.name){
    res.status(400).json({message:'missing required name field'})

  }else{
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const newPost = req.body
  if(newPost.query && newPost.query.text && newPost.query.text === ""){
    res.status(400).json({message:'missing text field'})
  }else{
    next()

  }
}



// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId
}