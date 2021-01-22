const Posts = require('../posts/posts-model.js')




function logger(req, res, next) {
  // do your magic!
}

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!

}

function validatePostId(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
  const { text } = req.body;
  if (text){
    next();
  } else{
    res.status(400).json({
      error: "please provide text here"
    })
  }
}

// do not forget to expose these functions to other modules
module.exports = { validatePost }