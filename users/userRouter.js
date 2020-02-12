const express = require('express');
const userDatabase = require('./userDb');
const postDatabase = require('../posts/postDb');

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

// /api/users/1/posts
router.post('/:id/posts', validateUserId, validatePost, (req, res) => 
{
  const newPost = {
    user_id: req.user.id,
    text: req.body.text
  };

  postDatabase.insert(newPost)
  .then(postCreated =>
  {
    res.status(201).json(postCreated);
  })
  .catch(err =>
  {
    res.status(500).json({message: 'error when trying to save the post'});
  })
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

router.get('/:id/posts', validateUserId, (req, res) => 
{
  userDatabase.getUserPosts(req.user.id)
  .then(userPosts =>
  {
    if(userPosts.length !== 0)
    {
      res.status(200).json(userPosts);
    }
    else
    {
      res.status(404).json({message: `user's posts doesn't exist`});
    }
  })
  .catch(err =>
  {
    res.status(500).json({mesage: `could not retrieve user's posts`});
  })
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

module.exports = router;
