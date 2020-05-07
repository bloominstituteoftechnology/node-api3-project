const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router();
router.use(express.json())
router.use('/:id', validateUserId, validatePost)


router.post('/', (req, res) => {
  //console.log(req.body)
  // do your magic!
  Users.insert(req.body)
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
  Posts.insert(req.body)
          .then(newPost=>{
              console.log(newPost)
              //if it successfully posts it recieves an id
              //so now we use that id to retrieve the object from the db
              res.status(200).json(newPost)  
          })
          .catch(err=>{
              console.log("failed to save new post", err )
              res.status(500).json(()=>{
                  message: "error updating the post list"
              })
          })
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
            res.status(404).json({message: 'there is no user with that id'})
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
  Users.update(req.params.id, req.body)
    .then(resp=>{
      console.log("user has been updated")
      Users.getById(req.params.id)
        .then(updatedUser=>{
          res.status(200).json(updatedUser)
        })
        .catch(err=>{
          res.status(500).json({
            message: 'Error retrieving data after update'
          })
        })

    })
    .catch(err=>{
      res.status(500).json({
        message: 'error updating user'
      })
    })

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  console.log(req.params.id)
  if(!req.params.id){
    res.status(400).json({message: 'your request needs an id as params'}) 
  }
  Users.getById(req.params.id)
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

//I combined the post a user validation into one
//checks if it is a post request
//checks if it has a valid body for a new user post
//then checks if it has a valid body for a new post
//if it is a post/put request and has neither of the above, it will throw an error
//if it isn't a post/put request to begin with it simply calls next()
function validatePost(req, res, next) {
  // do your magic!
  //console.log(req.method)
  if(req.method === 'POST' || req.method === 'PUT'){
        if(req.body.name){
        console.log('you are trying to add or update a user')
        next()
        }else if(req.body.text){
          req.body.user_id = req.params.id
          console.log('you are trying to add or update a post')
          next()
        }else{
          res.status(400).json({message: 'the body of your post request is invalid or undefined'})
        }
  }else{
    console.log('this is not a post request')
    next()
  }
}


module.exports = router;
