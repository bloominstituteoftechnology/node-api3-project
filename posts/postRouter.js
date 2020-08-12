const express = require('express');
const postDb = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get(req.query)
  .then((post)=>{
    res.status(200).json(post)
  })
  .catch((error)=> {
    next(error)
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb.getById(req.params.id)
  .then((post)=>{
    if(post){
      res.status(200).json(post)
    }
  })
  .catch((error)=>{
    next(error)
  })
});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  postDb.remove(req.params.id)
  .then((post)=> {
    res.status(200).json({message: "Post has been terminated"})
  })
  .catch((error)=> {
    next(error)
  })
});

router.put('/:id',validatePostId, (req, res) => {
  // do your magic!
  postDb.update(req.params.id, req.body)
  .then((post)=> {
    if(post){
      //changed
      const text = req.body.text
      res.status(201).json({message: "Post was updated successfully", text, post})
    }
    
  })
  .catch((error)=>{
    next(error)
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  postDb.getById(req.params.id)
  .then((posts)=> {
    if(posts){
      req.post = posts
      next()
    }else{
      res.status(400).json({message: "invalid post id"})
    }
    
  })
  .catch((error)=>{
    next(error)
  })
}

module.exports = router;
