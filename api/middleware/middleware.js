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
  users.getById(req.params.id)
    .then( user => {
      if(user){
        req.user = user
        next()
      } else {
        res.status(404).json({message: `User ${req.params.id} not found`})
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
        if(user.length === 0)
          next()
        else
          res.status(400).json({message: 'Name must be unique'})
      })
      .catch( error => {
        res.status(500).json({message: 'Server error', error})
      })
  }
  else
    res.status(400).json({ message: 'missing required name field' })
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(req.body.text)
    next()
  else
    res.status(400).json({ message: 'missing required text field' })
}
