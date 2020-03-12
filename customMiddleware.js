// custom middleware
const postDB = require('./posts/postDB.js')
const userDB = require('./users/userDB.js')

async function validatePostId(req, res, next) {
    try {
      let post = await postDB.getById(req.params.id)
      if (post) {
        req.post = post;
        next()
      }
      else {
        res.status(400).json({ error: "Couldn't find a post with that id." })
      }
    }
    catch (err) {
      console.error(err)
      res.status(500).json({ error: "Couldn't retrieve post information." })
    }
  }


async function validateUserId(req, res, next) {
    try {
      let user = await userDB.getById(req.params.id)
      if (user) {
        req.user = user;
        next()
      }
      else {
        res.status(400).json({ error: "Authentication error. Couldn't find a user with that id." })
      }
    }
    catch (err) {
      console.error(err)
      res.status(500).json({ error: "Internal server. Couldn't authenticate user." })
    }
  }
  
  function validateUser(req, res, next) {
    if (req.body) {
      if (req.body.name) {
        next()
      }
      else {
        res.status(400).json({ message: "missing required name field" })
      }
    }
    else {
      res.status(400).json({ message: "missing user data" })
    }
  }
  
  function validatePost(req, res, next) {
    if (req.body) {
      if (req.text) {
        next()
      }
      else {
        res.status(400).json({ message: "missing required text field" })
      }
    }
    else {
      res.status(400).json({ message: "missing post data" })
    }
  }


  module.exports = {
      validatePostId,
      validateUserId,
      validateUser,
      validatePost
  }