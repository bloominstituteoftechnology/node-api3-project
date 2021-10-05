const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(req.url,req.method,req._startTime)
  next()
  // DO YOUR MAGIC
}

function validateUserId(req, res, next) {
  const {id} = req.params;
  Users.getById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({message: `User ${id} does not exist`})
      } else {
        req.user = user
        next()
      }
    })
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}