const express = require('express');
const userDatabase = require('./userDb');
const postDatabase = require('../posts/postDb');
const {validateUser, validateUserId, validatePost} = require('../utils');
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

// /api/users/:id
router.delete('/:id', validateUserId, (req, res) => 
{
  userDatabase.remove(req.user.id)
  .then(deletedUser =>
  {
    res.status(200).json({message: `${req.user.name} has been deleted from the database`});
  })
  .catch(err =>
  {
    res.status(500).json({message: 'Could not delete user from the database'});
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => 
{
  userDatabase.update(req.user.id, req.body)
  .then(updated =>
  {
    res.status(200).json({id: req.user.id, name: req.body.name});
  })
  .catch(err => 
  {
    res.status(500).json({message: 'error updating user'});
  })
});

module.exports = router;
