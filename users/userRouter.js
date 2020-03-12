const express = require('express');
//import data
const post = require('../posts/postDb')
const db = require('./userDb')



const router = express.Router();

//-------------

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const {name} = req.body
  db.insert({name})
  .then(user=>{
    res.status(201).json(user)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json(({error: "new user could not be added!"}))
  })

});

//------------------

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  const {id: user_id} = req.params
  const{text} = req.body
  post.insert({user_id, text})
  .then(post=>{
    res.status(201).json(post)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({error:"error adding the new post"})
  })

});

//--------------------

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(users=>{
    res.status(200).json(users)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({error: "users array not found!"})
  })
});

//-----------------------

router.get('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
  
  db.getById(id)
  .then(user=>{
    if(user){
      res.status(200).json(user)
    }else{
      res.status(400).json({error: "user with specific id not found"})
    }
  })
  .catch(err=>{
    console.log(err)
  })
});

//-----------------------------

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const {id: userId} = req.params;
  db.getUserPosts(userId)
  .then(post=>{
   if(post){
     res.status(200).json(post)
   }else{
     res.status(400).json({error: "post with specific id not found"})
   }
  })
});

//--------------------------

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const{id} = req.params
  db.remove(id)
  .then(userDeleted=>{
    if(userDeleted){
      res.status(204).json({message: "user is successfully deleted"})
    }else{  //no need of else though since we have correct id and we are sure we deleted it
      res.status(500).json({error:"unsuccessful deletion"})
    }
  })
  .catch(err=>{
    console.log(err)
  })
});

//--------------------

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  const {name} = req.body  //name is destructured from body
  db.update(id,{name})
  .then(userUpdated=>{ //we need another promise to get the userinfo. If user is updated, find the user(by id) and give me the userinfo
    if(userUpdated){ 
      db.getById(id)
      .then(user=>{
        res.status(200).json(user)
      })
      .catch(err=>{
        res.status(500).json({error:"user is not updated"})
      })      
    }
    // else{
    //   res.status(404).json({error:"user is not updated"})
    // }   
  })
  .catch(err=>{
    console.log("user is not updated", err)
  })

});

//----------------------------

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  //destructure the id
  const {id} = req.params
  db.getById(id)
  .then(user=>{
    if(user){
      next()
    }else{
      res.status(404).json({error: "user with specific id not found"}) 
    }    
})
}

//---------------------------

function validateUser(req, res, next) {
  // do your magic!
  const {name} = req.body;
  if(!req.body){
    return res.status(400).json({error: "missing user data"})
  }
  if(!name){
    return res.status(400).json({error: "missing required name field"})
  }
  if (typeof name !== 'string'){
    return res.status(400)({error: "name should always be in strings"})
  }  
  next()   
}

//--------------------------------

function validatePost(req, res, next) {
  // do your magic!
  const {userId} = req.params
  const {text} = req.body
   if (!req.body){
    return res.status(400)({error: "missing post data" })
   }
   if (!text){
    return res.status(400)({error: "missing required text field" })
   }
   if(typeof text !== 'string'){
    return res.status(400)({error: "post needs to be a string"})
   }
 
  next()
}

module.exports = router;
