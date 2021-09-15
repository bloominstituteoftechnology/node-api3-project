const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method} ${req.path} ${Date.now()}`);
  next();
}

function validateUserId(req, res, next) {
  

    try{
      const {id} = req.params;
      const user = Users.findById(id);
      if(!user){
         res.status(404).json({message: `User ${user} not found`});
      } else {
        req.user = user;
        next();
      } 
    } catch(err){
      res.status(500).json({message: err.message});
    }
    
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if(!name || !name.trim()){
    res.status(400).json({message: 'Missing name'});
  } else {
    req.name = name.trim()
    next();
  }
}



function validatePost(req, res, next) {
  const { text } = req.body;
  if(!text || !text.trim()){
    res.status(400).json({message: 'Missing text'});
  } else {
    req.text = text.trim()
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};