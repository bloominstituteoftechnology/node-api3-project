const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');

function logger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method}
    REQUEST URL: ${req.originalUrl}
    TIMESTAMP: ${date.toLocaleString()}
  `);
  next()
}

function validateUserId(req, res, next) {
  const {id} = req.params;
  Users.getById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({message: "user not found"})
      } else {
        req.user = user
        next()
      }
    })
}

function validateUser(req, res, next) {
  const newUser = req.body;
  if (!req.body) {
    res.status(400).json({message: "missing user data"})
  } else if (!newUser.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const newPost = req.body;
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if (!newPost.text) {
    res.status(400).json({ message: "missing required text" })
  // else if (!newPost.text || !newPost.user_id) {
  //   res.status(400).json({ message: "missing required text or user_id fields" })
  } else {
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}