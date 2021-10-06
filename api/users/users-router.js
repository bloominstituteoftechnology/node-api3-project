const express = require('express');

const Users = require('./users-model.js')
const Posts = require('../posts/posts-model.js')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const { validateUserId, validateUser, validatePost } = require("../middleware/middleware.js")

const router = express.Router();

router.get('/', (req, res) => {
  Users.get(req.query)
  .then(users=>{
    res.status(200).json(users)
  })
  .catch(error=>{
    console.log(error)
    res.status(500).json({
      message: "error retrieving the users"
    })
  })
});

router.get('/:id',validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/',validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
});

router.put('/:id',validateUserId, validateUser, (req, res) => {
  Users.update(req.user.id, req.body)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
});

router.delete('/:id',validateUserId, (req, res) => {
  const {id}= req.params;
  let deletedUser;
  Users.getById(id)
  .then((user)=>{
    deletedUser = user;
  })
  .then(Users.remove(id)
  .then(()=>{
res.status(200).json(deletedUser)
    
}))
    .catch(err=>{
      res.status(400).json(err)
    })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts=>{
      res.status(200).json(posts)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  const newPost = await Posts.insert({
    user_id: req.params.id,
    text: req.body.text,
  });
  res.status(201).json(newPost);
});

// do not forget to export the router
module.exports = router