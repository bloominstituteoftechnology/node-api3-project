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

router.get('/:id', (req, res) => 
{
  // do your magic!
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
  
}

function validateUser(req, res, next) 
{
  
}

function validatePost(req, res, next) 
{
  
}

module.exports = router;
