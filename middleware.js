const db = require("./users/userDb")

async function validateUserId(req, res, next) {
  const user = await db.getById(req.params.id)
  if(user) {
    req.user = user
    next()
  } else {
    res.status(404).json({ message: `User with ID ${req.params.id} not found`})
  }
}

function validateUser(req, res, next) {
  if(req.body) {
    if(req.body.name) {
      next()
    } else {
      res.status(400).json({ message: "missing required name field"})
    }
  } else {
    res.status(400).json({ message: "missing user data"})
  }
}

function validatePost(req, res, next) {
  if(req.body) {
    if(req.body.text) {
      next()
    } else {
      res.status(400).json({ message: "missing required text field"})
    }
  } else {
    res.status(400).json({ message: "missing post data"})
  }
}

module.exports = {
  validateUserId,
  validateUser,
  validatePost
}