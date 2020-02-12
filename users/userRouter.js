const express = require('express');
const userDatabase = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => 
{
  userDatabase.insert(req.body)
  .then(user =>
  {
    res.status(201).json(user);
  })
  .catch(err =>
  {
    res.status(500).json({message: 'There was an error saving to the database'});
  })
});

router.post('/:id/posts', (req, res) => 
{
  // do your magic!
});

router.get('/', (req, res) => 
{
  userDatabase.get()
  .then(users =>
  {
    res.status(200).json(users);
  })
  .catch(err =>
  {
    res.status(500).json({error: 'Could not retrive information from the database'});
  })
});

router.get('/:id', validateUserId, (req, res) => 
{
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => 
{
  // do your magic!
});

router.delete('/:id', (req, res) => 
{
  // do your magic!
});

router.put('/:id', (req, res) => 
{
  // do your magic!
});

//custom middleware

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
  
}

module.exports = router;
