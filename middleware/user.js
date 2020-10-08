const userDB = require("../users/userDb")

function checkUserID() {
  return (req, res, next) => {
    userDB.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({
          message: "User not found",
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the user",
      })
    })
  }
}

function checkUserData() {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Missing username",
      })
    }
    next()
  }
}

module.exports = {
  checkUserID,
  checkUserData,
}