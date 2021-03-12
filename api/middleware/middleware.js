const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const {method,url} = req
  console.log({
    method: method,
    url: url,
    timestamp: new Date().toUTCString()
  });
  next();
}

// QUESTION: WHY DO WE USE ASYNC AWAIT HERE?
const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  try {
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json({message: "user not found"})
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }

}

// Q: where should line 35 go? inside try catch?
const validateUser = (req, res, next) => {
  // DO YOUR MAGIC
  const {body} = req
  try {
    if (!body) {
      res.status(400).json({message: "missing user data"})
    } if (!body.name) {
      res.status(400).json({message: 'missing required name field'})
    } else {
      next()
    }
  } catch (err) {
    next(err);
  }
  
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}