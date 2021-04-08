const users = require('../users/users-model.js')
const posts = require('../posts/posts-model.js')

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method, req.url, new Date().toISOString())
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  users.getById(req.params.user_id)
    .then( user => {
      if(user){
        req.user = user
        next()
      } else {
        res.status(404).json({message : `Could not find user with id ${req.params.user_id}`})
      }
    })
    .catch( error => {
      res.status(500).json({message: 'Server error', error})
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(req.body.name){
    users.checkNameUnique(req.body.name)
      .then( user =>{
        if(user)
          res.status(400).json({message: 'Name must be unique'})
        else
          next()
      })
      .catch( error => {
        res.status(500).json({message: 'Server error', error})
      })
  }
  else
    res.status(400).json({message: 'Name is required'})
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(req.body.text)
    next()
  else
    res.status(400)
}
