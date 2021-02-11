const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');

function logger(req, res, next) {
  // do your magic!
}

const validateUserId = async (req, res, next) => {
  const {id} = req.params
  try{
    const user = await Users.getById(id)
    if(!user) {
      res.status(400).json ({
        message: `No user with id: ${id}`
      })
    } else {
      req.user = user
      next();
    }

  } catch (error) {
    res.status(500).json(`Server error: ${error}`)
  }

}

function validateUser(req, res, next) {
  // do your magic!
}

const validatePost = async (req, res, next) => {
  const {id} = req.params
  try {
    const post = await Posts.getUserPost(id)
    if(!post) {
      res.status(400).json ({
        message: `No hub with id: ${id}`
      })
    } else {
      req.post = post
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: `Server error: ${error}`
    })
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}