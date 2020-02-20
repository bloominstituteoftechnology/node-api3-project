const express = require('express');

const router = express.Router();
const user = require('./userDb')
const post = require('../posts/postDb')
const logger = require('../middleware/logger')

router.post('/',validateUser(), async (req, res,next) => {
  const post = req.body;
   user.insert(post)
   .then(data=>{

     res.status(201).json(data)
   })

   .catch(next)

  

   
});

router.post('/:id/posts',validateUserId(), validatePost() ,(req, res,next) => {
  const text = req.text;
  // do your magic!
  post.insert(text)
  .then(posts=>{
    res.status(201).json(posts)
  })
  .catch(next)

});

router.get('/', async (req, res,next) => {
  // do your magic!
  user.get()
  .then(users=>{
    res.status(201).json(users)
  })
  .catch(err=>{
    next(err)
  })

  
});

router.get('/:id',validateUserId(), (req, res, next) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(),(req, res, next) => {
  // do your magic!
  const id = req.params.id;
  user.getUserPosts(id)
  .then(posts=>{
    res.status(200).json(posts)
  })
  .catch(next)
    
  })






router.delete('/:id', validateUserId(),(req, res,next) => {
  const id = req.params.id;
  // do your magic!
  user.remove(id)
  .then(()=>{
    res.status(202).status("user is deleted")
  })
  .catch(next)
});

router.put('/:id', validateUserId(), validateUser(),(req, res) => {
  const id = req.params.id;
  const name = req.body;
  // do your magic!
  user.update(id,name)
  .then(()=>{
    res.status(202).status("user is updated")
  })
  .catch(next)
});

//custom middleware

function validateUserId() {
  return (req, res, next)=>{
    const id = req.params.id;
    user.getById(id)
    .then(user=>{
      if(user){
        req.user = user;
        next()
      }else{
        res.status(400).json({errorMessage: 'Invaild Id'})
      }
    })
    .catch(error=>{
      next(error)
    })
  }
  // do your magic!

}

function validateUser() {
  // do your magic!
  return(req, res, next) => {
    if(!req.name) {
      console.log(req.name)
      return res.status(400).json({
        message: "Missing Name Input"
        
      })
    }
    next()
  }
}
   
    
   



function validatePost() {
  return(req,res,next)=>{
     post = {text: req.body.text, post_id: req.params.id}
    if(!req.post.text){
      res.status(400).json({errorMessage:'Missing post data'})
    }
    else {
      res.status(400).json({errorMessage:'Missing post data'})
      req.text=post;
      next()
    }
  }
  // do your magic!
}

module.exports = router;
