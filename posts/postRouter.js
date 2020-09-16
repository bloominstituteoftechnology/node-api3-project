const express = require('express');
const db = require ('./postDb');

const router = express.Router();

// -------get all the posts-------
router.get('/', (req, res) => { 
   db.get()
   .then(posts=>{
   if(posts){   
     return res.status(200).json(posts)
   }else{
     res.status(400).json({error: "error getting the posts"})
   }
  })
});

//-----------get the post by id---------
router.get('/:id', validatePostId, (req, res) => {  
  const {id} = req.params
  db.getById(id)
  .then(post=>{
    res.status(200).json(post)
  })
  .catch(err=>{
    res.status(400).json({error:"could not find the post with specific id"})
  })
});

//-------delete the post-------
router.delete('/:id', validatePostId, (req, res) => { 
const{id} = req.params
db.remove(id)
.then(()=>{
  res.status(204).json({message: "post is removed successfully!"})
})
});

//----------update the post-------
router.put('/:id', validatePostId, (req, res) => {
  const {id} = req.params
  const{text, user_id}= req.body
  db.update(id, {text,user_id})
  .then(updated=>{
    if(updated){ 
       db.getById(id)
      .then(post=>{
        res.status(200).json(post) 
      })
       .catch(err=>{
         console.log(err)
         res.status(400).json({error:"post is not updated!"})
       })      
    }else{

    }    
  })
});

// -------custom middlewares--------------------
//--------Middleware to validate postId---------

function validatePostId(req, res, next) {
  // do your magic!
  const {id} = req.params
  db.getById(id)
  .then(post=>{
    if(post){
      next()
    }else{
      res.status(400).json({error:"post not found"})
    }   
  })
}

module.exports = router;
