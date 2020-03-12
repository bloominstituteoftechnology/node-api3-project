const express = require('express');
//import data
const db = require('./userDb')

const router = express.Router();



router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

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

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

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
});

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

function validateUser(req, res, next) {
  // do your magic!
  const {name} = req.body;
  db.get({name})
  .then(user=>{
    if(user){
     next()
    }else{
    res.status(404).json({error: "user with specific name not found"})  
    }
  })
}

function validatePost(req, res, next) {
  // do your magic!
 
  next()
}

module.exports = router;
