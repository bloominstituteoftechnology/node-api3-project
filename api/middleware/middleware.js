const users = require('../users/users-model.js');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method);
  console.log(req.url);
  console.log(new Date().toLocaleString())
  next();
}

const getUserById = [validateUserId, (req, res) => {
  res.status(200).json(req.user);
}]

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params;
  try{
    const user = await users.getById(id);
    if(user){
      req.user = user;
      next();
    }
    else{
      next({message: 'User not found', status: 404});
    }
  }
  catch(err){
    next({error: err, message: err.message, status: 500 })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC  
  if(req.body){
      if(req.body.name === ''){
        next({ message: "missing required name field", status: 400 })
      }else {
        next();
      }
  }
  else{
    next({ message: "missing user data", status: 400 })
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(req.body){
    if(req.body.text === ''){
      next({ message: "missing required text field"})
    }else {
      next();
    }
  } else {
    next({ message: " missing post data ", status: 400 })
  }
}

// do not forget to expose these functions to other modules
module.exports = {logger,validateUserId,getUserById,validateUser,validatePost};