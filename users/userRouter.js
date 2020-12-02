const express = require('express');

const router = express.Router();
const User =  require('./userDb')

router.post('/', (req, res) => {
  console.log(req)
  const user = req.body
  User.insert(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err  => {
      console.log(err)
      res.status(500).json({ message: 'could not add user'})
    })
});

router.post('/:id/posts', (req, res) => {
  
});

router.get('/', (req, res) => {
  User.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.messaage })
    })
});

router.get('/:id', (req, res) => {
  const { id }  =  req.params
  User.getById(id)
    .then(user =>  {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.message })
    })
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params
  User.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error :  err.message })
    })

});

  router.delete('/:id', (req, res) => {

    Users.remove(req.params.id)
    .then(test => {
      res.status(200).json({message: 'good job removing them'})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err.message})
    })
  
});

router.put('/:id', (req, res) => {
  Users.update(req.params.id, req.body)
  .then(newUser => {
    res.status(200).json(newUser)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params
  if(id) {
    id === req.user
  }
  else{
    res.status(400).json({ message: 'invalid user id'})
  }
}

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({ message: "missing user data"})
  }
  else if(!req.body.name){
    res.status(400).json({ message:  "missing required name field"})
  }
  else{
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({ message: 'missing post data'})
  }
  else if(!req.body.text){
    res.status(400).json({ message: 'missing required text field'})
  }
  else{
    next()
  }
}

module.exports = router;
