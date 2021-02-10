const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`);
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

// do not forget to expose these functions to other modules
module.exports ={
  logger,
  validateUser,
  validateUserId,
  validatePost
}
