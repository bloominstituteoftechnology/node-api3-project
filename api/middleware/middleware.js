//imports
const users = require('../users/users-model');
const post = require('../posts/posts-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`Made a [${req.method}] to ${req.url} at ${time}`)
  next()
}//end of logger

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  users.getById(req.params.id)
  .then(user =>{
    if (user){
      req.user = user;
      next();
    }//end of if
    else{
      res.status(404).json({
        message:'User not found'
      })
    }//end of else
  })//end of then
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: "Error retrieving the user"
    })
  })//end of catch
}//end of validateUserId

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name)  {
    res.status(400).json({
      message : "Missing required name field"
    })
  }
  next();
}//end of validateUser

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json({
      message:"Missing required text field"
    })
  }
  next();
}//end of validatePost

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
