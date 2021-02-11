const Users = require('../users/users-model');
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  console.log(`${new Date().toUTCString()} ${req.method} to ${req.url} at ${req.get('Origin')}`);
}

async function validateUserId (req, res, next) {
  const id = req.params.id;
  try{
    const user = await Users.getById(id);
    if(!user){
      res.status(400).json({message: 'user not found'});
    } else{
      req.user = user
      next();
    }
  } catch(error){
    res.status(500).json({message: 'User could not be retrieved'});
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  try{
      if(!name){
          res.status(400).json({message: 'missing user data'});
      } else{
        next();
      }
    } catch(error){
      res.status(400).json({message: 'missing required name field'});
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  try{
        if(!text){
            res.status(400).json({message: 'missing post data'});
          } else{
            next();
          }
      } catch(error){
          res.status(400).json({message: 'missing required text field'});
        }
}

async function validatePostId (req, res, next) {
  const id = req.params.id;
  try{
    const post = await Posts.getById(id);
    if(!post){
      res.status(400).json({message: 'Post not found'});
    } else{
      req.post = post
      next();
    }
  } catch(error){
    res.status(500).json({message: 'Post could not be retrieved'});
  }
}

// do not forget to expose these functions to other modules
module.exports ={
  logger,
  validateUser,
  validateUserId,
  validatePost,
  validatePostId
}