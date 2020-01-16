const express = require('express');

const router = express.Router();
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js')
const validateUser = require('../middleWare/validateUser.js')
const validateUserId = require('../middleWare/validateUserId')

function validatePost(req, res, next) {
  if (!req.body.text){
    res.status(400).json({error: 'Sorry, we need some text in order to make a post'})
  } else {
    console.log('post validated')
    next()
  }
}





router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
      .then(postRes=>{
        res.status(201).json({postRes})
      })
      .catch(err=>{
        console.log('post err', err)
        res.status(500).json({errorMessage: 'Failed to save user'})
      })  
});

// router.post('/:id/posts', (req, res) => {
//   // do your magic!
// });

router.get('/', (req, res) => {
  Users.get()
    .then(usersList=>{
      res.status(200).json({usersList})
    })
    .catch(err=>{
      res.status(500).json({errorMessage: 'Failed to get users'})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json({user})
    })
    .catch(err=>{
      console.log('getById err', err)
      res.status(500).json({errorMessage: 'Failed to get users'})
    })
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user=>{
      user.
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(deletedRes=>{
      res.status(200).json({deletedRes})
    })
    .catch(err=>{
      console.log('getById err', err)
      res.status(500).json({errorMessage: 'Failed to delete user'})
    })
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // do your magic!
  const updatedData = req.body
  Users.update(req.params.id, updatedData)
    .then(updatedUser=>{
      res.status(201).json({updatedUser})
    })
    .catch(err=>{
      console.log('getById err', err)
      res.status(500).json({errorMessage: 'Failed to update user'})
    })
});


module.exports = router;
