const { getById, getUserPosts } = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method, req.url, Date.now())
  next
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  getById(req.params.id)
    .then(user => {
      if (user) {
        next()
      } else {
        next({
          status: 404,
          message: 'user not found'
        })
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  getById(req.params.id)
  .then(user => {
    if (user) {
      next()
    } else {
      next({
        status: 404,
        message: 'user not found'
      })
    }
  })
  .catch(next)
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  getUserPosts(req.params.id)
  .then(user => {
    if (user) {
      next()
    } else {
      next({
        status: 404,
        message: 'user not found'
      })
    }
  })
  .catch(next)
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }