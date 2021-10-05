const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method, req.url, Date(Date.now()).toString())
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log('validating id')
  const { id } = req.params
  User.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next()
      }
      else {
        res.status(404).json({ message: "user not found" })
      }
    })
    .catch(err => {
      res.status(404).json('Error retrieving from database')
    })

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validating user')
  if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" })
  }
  else {
    next()
  }

}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validating post!')
  if (!req.body.text || !req.body.user_id) {
    res.status(400).json({ message: "missing required text field or missing user id" })
  }
  else {
    next()
  }

}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

// do not forget to expose these functions to other modules
