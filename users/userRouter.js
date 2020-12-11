const express = require('express');

const { validateUserId, validateUser, validatePost} = require('./user-middleware')
const router = express.Router();

const user = require('./userDb')

router.post('/', validateUser(),(req, res, next) => {
 user.insert(req.body)
 .then((user) => {
   res.status(200).json(user)
 })
 .catch((err) => {
   next(err)
 })
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res,next) => {
  if(!req.body.text) {
    return res.status(400).json({
      nessage: "Need a value for the text"
    })
  }

  user.addUserPost(req.params.id,req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/', validateUser(), (req, res, next) => {
      res.status(200).json(req.user)
});

router.get('/:id', validateUserId(), (req, res, next) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), validatePost(), (req, res) => {
 res.status(200).json(req.posts)
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  user.remove(req.params.id)
  .then((count) => {
    if(count > 0) {
      res.status(200).json({
        message: "The user has been removed"
      }) 
    } else {
      res.status(404).json({
        message: "The user could not be removed"
      })
    }
  })

  .catch((err) => {
    next(err)
  })
});

router.put('/:id', validateUserId(), (req, res, next) => {
  if(!req.body.name) {
    res.status(400).json({
      message: "missing user name"
    })
  }
  user.update(req.params.id, req.body)
    .then((user) =>{
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "User could not be found"
        })
      }
    })
    .catch((err) => {
      next(err)
    })
});



module.exports = router;
