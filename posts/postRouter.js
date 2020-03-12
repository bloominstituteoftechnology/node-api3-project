const express = require('express');
//import data
const db = require ('./postDb');

const router = express.Router();


router.get('/', (req, res) => {
  // do your magic!
   db.get()
   .then(posts=>{
   if(posts){   // can do .then/.catch instead of if/else
     return res.status(200).json(posts)
   }else{
     res.status(400).json({error: "error getting the posts"})
   }
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const {id} = req.params
  db.getById(id)
  .then(post=>{
    res.status(200).json(post)
  })
  .catch(err=>{
    res.status(400).json({error:"could not find the post with specific id"})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
const{id} = req.params
db.rem
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

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
