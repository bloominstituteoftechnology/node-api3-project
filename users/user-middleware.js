//custom middleware

const users = require('./userDb')

function validateUserId() {
    return(req,res,next) => {
        users.getById(req.params.id)
        .then((user) => {
            if (user) {
                req.user = user
                next()
            } else {
                res.status(404).json({
                    message: "The User Can NOT be found in our database!!!"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Error getting the user from our database"
            })
        })
    }
  }
  
  function validateUser() {
    return(req,res,next) => {
        
    }
  }
  
  function validatePost() {
    return(req,res,next) => {
        
    }
  }

  module.exports = {
      validateUserId
  }