const express = require('express');
const users=require("./userDb")
const router = express.Router();
const posts=require("../posts/postDb")

router.post('/', 
validateUser, 
(req, res) => {
  // do your magic!
  // if(!req.body.name){
  //   return res.status(400).json({
  //       errorMessage: "Please provide users name."
  //   })
  // }    

  users.insert(req.body)
  .then(user=>{
    // if(!user){res.status(400).json({message: "missing user data"})}
    res.status(201).json(user)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({message: "There was an error while saving the user to the database."})
  })

}
);

router.post('/:id/posts', validateUserId, validatePost,(req, res) => {
  // do your magic!
  // if(!req.params.id){res.status(404).json({message:"The user with this specified ID does not exist."})}
  //  if(!req.body.text || !req.body.user_id){res.status(400).json({message: "missing required text field"})}
  posts.insert(req.body)
      .then((post)=>{res.status(201).json(post)})
      .catch((error)=>{
          console.log(error)
          res.status(500).json({error:"There was an error while saving the post to the database"})
      })
});

router.get('/', (req, res) => {
  // do your magic!  
  users.get(req.query)
    .then(users=>res.status(200).json(users))
    .catch(err=>{
      console.log(err)
      res.status(500).json({message:'No data'})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
users.getById(req.params.id)
.then(user=>{
  // if(!user){res.status(404).json({message: "The user does not exist"})}
  res.status(200).json(user)
})
.catch(err=>{
  console.log(err)
  res.status(500).json({message: "something went wrong"})
})
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
  .then(postComment=>
      {
          // if(!postComment){res.status(404).json({message: "The post with the specified ID does not exist or the post has no comments."})}
          res.status(200).json(postComment)})
  .catch(error=>{
      console.log(error)
      res.status(500).json(error)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
  .then(()=>
  {res.status(200).json({message: "The user has been deleted."})})
  // else{res.status(404).json({message: "The user with the specified ID does not exist."})}})
  .catch((error)=>{
      console.log(error)
      res.status(500).json({error: "The user could not be removed."}
  )})
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  if(!req.body.name){
    res.status(400).json({
        errorMessage: "Please provide name for the user."
    })
}
users.update(req.params.id,req.body)
    .then(user=>
        res.status(200).json(user))
        // else{res.status(404).json({message: "The user with the specified ID does not exist."})}})
    .catch(error=>{
        console.log(error)
        res.status(500).json({error: "The user information could not be modified."})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id)
  .then(user=>{
    if(user){req.user=user
  next()}  
  else{
    res.status(404).json({
      message:"The user with this specified ID does not exist."})}
  })
  .catch(err=>next(err))
  
}

function validateUser(req, res, next) {
  // do your magic!
    if (!req.body){res.status(400).json({message: "missing user data"})}
    else if(!req.body.name){
    res.status(400).json({
      message: "missing required name field"})}
      else{next()}

  
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body){res.status(400).json({message: "missing post data"})}
  else if(!req.body.text|| !req.body.user_id){
  res.status(400).json({
    message: "missing required text field"})}
    else{next()}
}

module.exports = router;
