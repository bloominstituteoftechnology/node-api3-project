const express = require('express');

const userDb = require("../users/userDb")
const postDb = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser,  (req, res,next) => {
  userDb.insert(req.body)
      .then(user=>{
          res.status(201).json(user)
      })
      .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res,next) => {
    postDb.insert({user_id:req.params.id,text:req.body.text})
        .then(post=>{
            res.status(201).json(post)
        })
        .catch(next)
});

router.get('/', (req, res,next) => {
  userDb.get()
      .then(posts=>{
          res.status(200).json(posts)
      })
      .catch(next)
});

router.get('/:id', validateUserId, (req, res,next) => {
    res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res,next) => {
    userDb.getUserPosts(req.user.id)
        .then(posts=>{
            res.status(200).json(posts)
        })
        .catch(next)
});

router.delete('/:id', validateUserId, (req, res,next) => {
  userDb.remove(req.user.id)
      .then(user=>{
          res.status(200).json(req.user)
      })
      .catch(next)
});

router.put('/:id', validateUser, validateUserId, (req, res,next) => {
    userDb.update(req.params.id,req.body)
        .then(user=>{
            userDb.getById(req.params.id)
                .then(updated=>{
                    res.status(201).json(updated)
                })
                .catch(next)
        })
        .catch(next)
});

//custom middleware

function validateUserId(req, res, next) {
    userDb.getById(req.params.id)
        .then((user)=>{
            user ? (req.user=user,next()) :
                res.status(404).json({message: "invalid user id"})
        })
        .catch(next)
}

function validateUser(req, res, next) {
  !req.body.name ? res.status(400).json({message:"missing required name field"}):
      next()
}

function validatePost(req, res, next) {
  !req.body ? res.status(400).json({message:"missing post data"}) :
      !req.body.text ? res.status(400).json({message:"missing required text field"}) :
          next()
}

module.exports = router;
