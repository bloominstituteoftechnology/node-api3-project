const express = require('express');
const server = require ('../server')
const router = express.Router();
const Users = require('./userDb.js')
const Posts = require('../posts/postDb')


 router.post('/', validateUser,(req, res) => {
  // do your magic!

  const user = (req.body);
   
  Users.insert(user)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'Error adding the User'
    })
  })
});

router.get('/', (req,res) => {
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err=> {
    res.status(500).json({
      message: 'Error retrieving the users'
    })
  })
})
router.post('/:id/posts', validatePost,  (req, res) => {
  // do your magic!
   Posts.insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({message: 'Error posting'})
  })

});

 

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).json({message: 'User not found'})
    }
  })
});

router.get('/:id/posts', validateUserId,validatePost,(req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({message: 'error retrieving the posts'})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    if (count >0){
      res.status(200).json({message: 'The userhas been deleted'})
    }else{
      res.status(404).json({message: 'The user could not be found'})
    }
  })
  
});

router.put('/:id', validateUserId,(req, res) => {
  // do your magic!
  const changes = req.body
  Users.update(req.params.id,changes)
  .then(user => {
    if(user){
      res.status(200).json(user)
    }else{
      res.status(404).json({message: 'User could not be found'})
    }
  })
  .catch(err => {
    res.status(500).json({
      message: 'Error updating the user'
    })
  })
   
});

//custom middleware

 async function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  const user =  await Users.getById(id)
   if(user){
     next();
   }else {
     res.status(404).json({message: 'Must have a valid Id.'})
   }
}

function validateUser(req, res, next) {
  // do your magic!
   const user = req.body.name;
    if(user){
     next();
   }else{
     res.status(400).json({message: 'Missing User Data.'})
   }

}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body.text;
  if(body){
    next();
  }else{
    res.status(400).json({message: 'Please include a body in your request'})
  }
}

module.exports = router;
