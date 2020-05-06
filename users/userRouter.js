const express = require('express');
const Users = require('./userDb')
const router = express.Router();
router.use(express.json())
router.use(validatePost)
router.use('/:id', validateUserId, validateUser)


router.post('/', (req, res) => {
  //console.log(req.body)
  // do your magic!
      Users.insert(req.body.post)
          .then(newUser=>{
              console.log(newUser)
              //if it successfully posts it recieves an id
              //so now we use that id to retrieve the object from the db
              res.status(200).json(newUser)  
          })
          .catch(err=>{
              console.log("failed to save new user", err )
              res.status(500).json(()=>{
                  message: "error updating the user list"
              })
          })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!

});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then(userData=>{
        res.status(200).json(userData)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({message: 'Error retrieving data'})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user =>{
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'there is no post with that id'})
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: 'Error retrieving data'
        })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(posts=>{
      res.status(200).json(posts)
    })
    .catch(err=>{
      res.status(500).json({
          message: 'unable to retrieve posts'
      })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
    Users.remove(req.params.id)
      .then(resp=>{
          console.log(resp)
          res.status(200).json(resp)
      })
      .catch(err=>{
          res.status(500).json({
              message: 'the post could not be removed'
          })
      })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  if(!req.params.id){
    res.status(400).json({message: 'your request needs an id as params'}) 
  }
  Users.getById()
    .then(user=>{
      if(user){
        next();
      }else{
        res.status(404).json({message: 'the user with that id is undefined'})
      }
    })
    .catch(err=>{
      res.status(500).json({
        message: 'Error retrieving data'
      })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req.method)
  if(req.method === 'POST' || req.method === 'PUT'){
        if(req.body.name){
        console.log('you are trying to add or update a user')
        next()
        }else if(req.body.text){
          console.log('you are trying to add or update a post')
        }else{
          res.status(400).json({message: 'the body of your post request is invalid or undefined'})
        }
  }else{
    console.log('this is not a post request')
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  console.log(req.method)
  if(req.method === 'POST'){
        if(req.body){
        console.log('this is a post request')
        postBody = {...req.body}
        req.body = {}
        req.body.post = postBody
        next()
        }else{
          res.status(400).json({message: 'the body of your post request is undefined'})
        }
  }else{
    console.log('this is not a post request')
    next()
  }
}

module.exports = router;
