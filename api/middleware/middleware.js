const User = require('../users/users-model');
function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${method}] ${url}  at ${timestamp}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await User.getById(req.params.id)
    if(!user){
     
        next({status: 404 , message: 'user not found'})
      
    }else{
      req.user = user
      next()
    }

  }//end of try
  catch{
    res.status(500).json({
      message: 'problem finding user'
    })

  }//end of catch



}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name} = req.body
  if(!name || !name.trim()){
    res.status(400).json({
      message:'missing required name'
    })
  }else{
    req.name = name.trim();
    next()
  }


}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text} = req.body
  if(!text || !text.trim()){
    res.status(400).json({
      message:'missing required text field'
    })
  }else{
    req.text = text.trim();
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