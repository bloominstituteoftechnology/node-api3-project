const users = require("../users/users-model")

function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.url}, Timestamp: ${Date().toISOString()}`)
  next()
}

function validateUserId() {
  return (req, res, next) => {
    users.getById(req.params.id)
      .then ((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({message: "user not found"});
        }
      })
      .catch ((error) => {
        console.log(error);
      })
  }
}


// function validateUser(req, res, next) {
//   if(!req.body) {
//     res.status(400).json({ message: "missing user data" })
//   } else if(!req.body.name) {
//     res.status(400).json({ message: "missing required name field" })
//   } else {
//     req.userEdit = req.body
//     next()
//   }
// }

function validateUser() {
  return (req, res, next) => {
  if(!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if(!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}
}

// function validatePost(req, res, next) {
//   if(!req.body) {
//     res.status(400).json({ message: "missing post data" })
//   } else if(!req.body.text) {
//     res.status(400).json({ message: "missing required text field" })
//   } else {
//     res.postEdit = req.body
//     next()
//   }
// }

function validatePost() {
  return (req, res, next) => {
    if(!req.body) {
      res.status(400).json({ message: "missing post data" })
    } else if(!req.body.text) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      res.postEdit = req.body
      next()
    }
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

// do not forget to expose these functions to other modules
