const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router();


const checkUserId = (req, res, next) => {
  const { id } = req.params;

  Users.getById(id)
  .then(userID => {
    if(userID){
      req.id = id;
      next();
    } else{
      res.status(404).json({ message: `user with id ${id} not found` })
    }
  })
  .catch(err => {
    res.status(500).json({message: err.message})
  })
}



router.post('/', validateUser, (req, res) => {
  console.log(req)
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message:'could not add user' + err.message})
  })
});

router.post('/:id/posts', checkUserId, validatePost, (req, res) => {
  console.log(req.body, req.params.id)
  const newPost = {...req.body, user_id:req.params.id}

  Posts.insert(newPost)
  .then(post => {
    res.status(210).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});

router.get('/', (req, res) => {
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({error: err.message})
  })
});

router.get('/:id', checkUserId, (req, res) => {
  const {id} = req.params
  Users.getById(id)
  .then(T => {
    res.status(200).json(T)
    .catch(err =>{
      console.log(err)
      res.status(500).json({error: err.message})
    })
  })



});

router.get('/:id/posts', checkUserId, validatePost, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});

router.delete('/:id', checkUserId, (req, res) => {
  
  Users.remove(req.params.id)
  .then(test => {
    res.status(200).json({message: 'good job removing them'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })

});

router.put('/:id', checkUserId, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(newUser => {
    res.status(200).json(newUser)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});





function validateUser(req, res, next) {
  if(!req.body.name){
    res.status(400).json({message:'please fill out your name'})
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message:'please fill out the form'})
  } else if(!req.body.text) {
    res.status(400).json({message:'please fill out text'})
  } else{
    next();
  }
}

module.exports = router;
