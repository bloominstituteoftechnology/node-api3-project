const express = require('express');

const router = express.Router();
const postsModel=require('./posts-model');
const { validatePostId,validatePost } = require('../middleware/middleware');

router.get('/', async (req, res) => {
  // do your magic!
  const postList= await postsModel.get()
  try {
    if(postList){
      res.status(200).json(postList)
    }else{
      res.status(400).json('oh no post found')
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  res.status(200).json(req.post)
});

router.delete('/:id',validatePostId, async(req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  try {
    const deleted= await postsModel.remove(req.post.id)
    if(deleted===1){
      res.status(200).json(deleted)
    }else {res.status(400).json({message: "unable to delete"})}
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.put('/:id',validatePostId,validatePost, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
 try {
  const updated= await postsModel.update(req.post.id,req.body)
     res.status(200).json(updated)
 } catch (err) {
   res.status(500).json({message: err.message})
 }
});

// do not forget to export the router
module.exports=router;