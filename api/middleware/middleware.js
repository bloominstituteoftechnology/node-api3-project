const postsModel = require('../posts/posts-model');
const usersModel = require('../users/users-model');


function logger(req, res, next) {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}, Request timestamp: ${new Date().toDateString}`)
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  usersModel.getById(id)
    .then((user) => {
      if (user){
        console.log(`User ${user} found.`)
        req.user=user
        next();
      } else {
        res.status(404).json({ message: "user not found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Error ${err}`})
    })
}

function validateUser(req, res, next) {

  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else {
    if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      next();
    }
  }
}

function validatePostId(req, res, next) {
  const { id } = req.params;

  postsModel.getById(id)
    .then((post) => {
      if (post){
        console.log(`Post ${post} found.`)
        req.post=post
        next();
      } else {
        res.status(404).json({ message: "post not found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Error ${err}`})
    })
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else {
    if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      next();
    }
  }
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser, validatePostId, validatePost };