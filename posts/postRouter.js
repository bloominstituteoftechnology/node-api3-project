const express = require('express');
const postDb = require('./postDb')

const router = express.Router();

router.get('/posts', (req, res, next) => {
  postDb.get()
      .then(posts=>{
          res.status(200).json(posts)
      })
      .catch(next)
});

router.get('/posts/:id', validatePostId, (req, res, next) => {
  postDb.getById(req.params.id)
      .then(posts=>{
          res.status(200).json(posts)
      })
      .catch(next)
});

router.delete('/posts/:id', validatePostId, (req, res, next) => {
  postDb.remove(req.params.id)
      .then(post=>{
          res.status(201).json(req.post)
      })
      .catch(next)
});

router.put('/posts/:id',validatePostBody, validatePostId, (req, res, next) => {
    postDb.update(req.params.id, req.body)
        .then(post=>{
            postDb.getById(req.params.id)
                .then(updated=>{
                    res.status(200).json(updated)
                })
                .catch(next)
        })
        .catch(next)
});

// custom middleware

function validatePostId(req, res, next) {
  postDb.getById(req.params.id)
      .then(post=>{
          post ? (req.post = post, next()):
              res.status(404).json({message:"invalid post id"})
      })
      .catch(next)
}

function validatePostBody(req,res,next){
   !req.body ? res.status(400).json({message:"missing post data"}) :
       !req.body.text ? res.status(400).json({message:"missing required text field"}):
           next()
}


module.exports = router;
