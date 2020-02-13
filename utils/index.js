const userDatabase = require('../users/userDb');
const postDatabase = require('../posts/postDb');

function validateUserId(req, res, next) 
{
  userDatabase.getById(req.params.id)
  .then(user =>
  {
    if(user)
    {
      req.user = user;
      next();
    }
    else
    {
      res.status(400).json({message: 'invalid user ID'});
    }
  })
  .catch(err =>
  {
    res.status(500).json({message: 'Could not validate'});
  })
}

function validateUser(req, res, next) 
{
  if(req.body.constructor === Object && Object.keys(req.body).length === 0)
  {
    res.status(400).json({message: 'missing user data'});
  }
   
  if(!req.body.name)
  {
    res.status(400).json({message: 'missing required name field'});
  }
  else
  {
    next();
  }
}

function validatePost(req, res, next) 
{
  if(req.body.constructor === Object && Object.keys(req.body).length === 0)
  {
    res.status(400).json({message: 'missing post data'});
  }
   
  if(!req.body.text)
  {
    res.status(400).json({message: 'missing required text field'});
  }
  else
  {
    next();
  }
}

function validatePostId(req, res, next) 
{
  postDatabase.getById(req.params.id)
  .then(post =>
  {
    if(post)
    {
      req.post = post;
      next();
    }
    else
    {
      res.status(400).json({message: 'invalid post ID'});
    }
  })
  .catch(err =>
  {
    res.status(500).json({message: 'Could not validate'});
  })
}


module.exports = {
  validatePost,
  validatePostId,
  validateUser,
  validateUserId
}