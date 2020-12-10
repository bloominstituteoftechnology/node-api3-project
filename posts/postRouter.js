const express = require('express');
const { getById } = require('../users/userDb');
const posts= require("./postDb");
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  getById(req.params.id)
  .then(post)
  posts.get(req.query)
    .then(userPosts=>res.status(200).json(userPosts))
    .catch(err=>{
      console.log(err)
      res.status(500).json({message:'No data'})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
.then(post=>{
  if(!post){res.status(404).json({message: "The post does not exist"})}
  else{res.status(200).json(post)}
})
.catch(err=>{
  console.log(err)
  res.status(500).json({message: "something went wrong"})
})
});

router.delete('/:id', (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
  .then((postId)=>
  {if(postId>0){res.status(200).json({message: "The post has been deleted."})}
  else{res.status(404).json({message: "The post with the specified ID does not exist."})}})
  .catch((error)=>{
      console.log(error)
      res.status(500).json({error: "The post could not be removed."}
  )})
});

router.put('/:id', (req, res) => {
  // do your magic!
  if(!req.body.text || !req.body.user_id){
    res.status(400).json({
        errorMessage: "Please provide name for the user."
    })
}
users.update(req.params.id,req.body)
    .then(user=>
        {if(user){res.status(200).json(user)}
        else{res.status(404).json({message: "The user with the specified ID does not exist."})}})
    .catch(error=>{
        console.log(error)
        res.status(500).json({error: "The user information could not be modified."})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  posts.getById(req.params.id)
  .then(post=>{
    if(post){req.post=post
  next()}  
  else{
    res.status(404).json({
      message:"The user with this specified ID does not exist."})}
  })
  .catch(err=>next(err))
}

module.exports = router;
