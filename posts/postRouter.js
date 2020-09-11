const express = require('express');
const Helpers = require('../users/userDb.js');
const Posts = require('./postDb.js');

const router = express.Router();

// router.use((req, res, next)=>{
//   console.log("in the posts router!");
//   next()
// })

router.get('/', (req, res) => {
  Posts.get()
  .then(posts =>{
    res.status(200).json(posts);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({message: 'error retrieving posts'});
  })
});


router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
  .then(post =>{
    res.status(200).json(post);
  })
  .catch(error=>{
    console.log(error);
    res.status(404).json({message: "Unable to locate post with that id"})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
  .then(removed =>{
    res.status(200).json({message: "The post has been deleted"})
  })
  .catch(error=>{
    console.log(error);
    res.status(404).json({message: "Unable to delete post"})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
  .then(post=>{
    if(post){
    res.status(200).json(post);
  }else{
    res.status(404).json({message: "the post could not be found"});
  }
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json({ message: 'Error updating the post'});
  })
});

// custom middleware

function validatePostId(req, res, next) {
  const {id} = req.params;
  Posts.getById(id)
    .then(post =>{
      if(post){
        req.post = post;
        next();
      }else{
        res.status(400).json({message: 'invalid post id'});
      }
    })
}

module.exports = router;
