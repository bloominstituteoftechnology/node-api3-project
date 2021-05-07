const express = require('express');
const User = require('./users-model');
const Posts = require('../posts/posts-model');
const {logger , idChecker, validateUser, validatePost} = require('../middleware/middleware')
const router = express.Router();

router.get('/', logger, (req, res, next) => {
  User.get()
  .then(user =>{
    res.status(200).json(user)
  })
  .catch(next)
});

router.get('/:id', logger, idChecker, (req, res, next) => {
  res.status(200).json(req.user)
});

router.post('/', logger, validateUser, (req, res, next) => {
  User.insert(req.body)
  .then(user =>{
    res.status(201).json(user)
  })
  .catch(next)
});

router.put('/:id', logger, idChecker, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
  .then(async()  =>{
    const data = await User.getById(req.params.id)
    res.status(200).json(data)
  })
  .catch(next)
});

router.delete('/:id', logger, idChecker, (req, res) => {
  const data = req.user
  User.remove(req.params.id)
  .then(() =>{
    res.status(200).json(data)
  })
  .catch()
});

router.get('/:id/posts', logger, idChecker, (req, res, next) => {
  User.getUserPosts(req.params.id)
  .then(post =>{
    res.status(200).json(post)
  })
  .catch(next)
});

router.post('/:id/posts', logger, idChecker, validatePost, (req, res, next) => {
  const postInfo = {...req.body, user_id:req.params.id}
  Posts.insert(postInfo)
  .then(post =>{
    res.status(201).json(post)
  })
  .catch(next)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    note: 'something went wrong',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;