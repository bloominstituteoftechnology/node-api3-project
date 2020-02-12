const express = require('express');
const userDatabase = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => 
{
  // do your magic!
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
  
}

function validatePost(req, res, next) 
{
  
}

module.exports = router;
