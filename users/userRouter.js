const express = require('express');

const router = express.Router();

const Methods = require('./userDb')
const postMethod = require('../posts/postDb')


router.post('/',validateUser, (req , res) => {
    const newUser = req.body
    Methods.insert(newUser)
    .then( newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'We are having trouble retrieving your data'})
    })
});

router.post('/:id/posts', validatePost, (req, res) => {
    postMethod.insert(req.body)
    .then( newPost => {
      res.status(200).json(newPost)
    })
    .catch( err => {
      console.log(err)
      res.status(500).json({ message: 'We had trouble gettting your data'})
    })
});

router.get('/', (req, res) => {
  Methods.get(req.query)
  .then( all => {
    res.status(200).json(all)
  })
  .catch( err => {
    console.log(err)
    res.status(500).json({message: ' We are having trouble fetching your data'})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  Methods.getById(req.params.id)
  .then( user => {
    res.status(200).json(user)
  })
  .catch( err => {
    console.log(err)
    res.status(500).json({ message: 'We are having trouble fetching your data'})
  })
});

router.get('/:id/posts', validateUserId,(req, res) => {
    Methods.getUserPosts(req.params.id)
    .then( allPosts => {
      res.status(200).json(allPosts)
    })
    .catch( err=>{
      console.log(err)
      res.status(500).json({ message: ' We had trouble retrieving your data'})
    })
});

router.delete('/:id',validateUserId, (req, res) => {
    Methods.remove(req.params.id)
    .then( removed =>{
      res.status(200).json(removed)
    })
    .catch( err =>{
      console.log(err)
      res.status(500).json({ message: 'We had trouble retrieving your data'})
    })
});

router.put('/:id',validateUserId, (req, res) => {
    const updateUser = req.body
    Methods.update(req.params.id , updateUser)
    .then( updatedUser => {
      res.status(200).json(updatedUser)
    })
    .catch( err => {
      console.log(err)
      resw.status(500).json({ message: ' We had trouble retrieving your data'})
    })
});

//custom middleware

function validateUserId(req, res, next) {
      Methods.getById(req.params.id)
      .then( val => {
        if(val){
          next()
        }else{
          res.status(404).json({message: 'The ID you entered if not valid'})
        }
      })
}

function validateUser(req, res, next) {
     if(req.body === undefined){
       res.status(400).json({message: 'missing user data'})
     } else if ( req.body.name === ""){
       res.status(400).json({ message: "missing required text field"})
     } else{
       next();
     }
}

function validatePost(req, res, next) {
    if(req.body === undefined){
      res.status(400).json({message: 'missing user data'})
    } else if ( req.body.text === ""){
      res.status(400).json({ message: "missing required text field"})
    } else{
      next();
    }
}

module.exports = router;
