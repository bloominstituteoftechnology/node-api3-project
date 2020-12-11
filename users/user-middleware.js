//custom middleware

const users = require('./userDb')
const { post } = require('./userRouter')

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
        users.get()
        .then((user) => {
            if(user) {
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
  
  function validatePost() {
    return(req,res,next) => {
        users.getUserPosts(req.params.id)
        .then((posts) => {
            if(posts) {
                req.posts = posts
                next()
            } else {
                res.status(404).json({
                    message: "post can not be found"
                })
            }
            
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "error retriving posts"
            })
        })
    }
  }

  module.exports = {
      validateUserId,
      validateUser,
      validatePost

  }