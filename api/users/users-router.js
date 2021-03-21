const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const userModel = require('./users-model.js')
const postModel = require('../posts/posts-model.js')
const router = express.Router();
const middleware = require('../middleware/middleware.js');

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  userModel.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving the Users'});
    });
});

router.get('/:id',middleware.validateUserId, middleware.getUserById);

router.post('/', middleware.validateUser, async (req, res, next) => { 
  try{
    const user = await userModel.insert(req.body);
    res.status(201).json(user);
  }
  catch(err){
    next({error: err, message: err.message, status: 500})
  }
});

router.put('/:id',middleware.validateUserId,middleware.validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try{
    await userModel.update(req.params.id,req.body);
    const updatedUser = await userModel.getById(req.params.id);
    res.status(201).json(updatedUser);
  }
  catch(err){
    next({error: err, message: err.message, status: 500})
  }
});

router.delete('/:id',middleware.validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const deletedUser = await userModel.getById(req.params.id);
    await userModel.remove(req.params.id);
    res.status(201).json(deletedUser);
  }
  catch(err){
    next({error: err, message: err.message, status: 500})
  }
});

router.get('/:id/posts', middleware.validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.params.id);
  try {
    const allPosts = await userModel.getUserPosts(req.params.id);
    res.status(201).json(allPosts);
  }
  catch(err){
    next({error: err, message: 'error getting messages', status: 500})
  }
});

router.post('/:id/posts', middleware.validateUserId,middleware.validatePost, 
async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const postInfo = { ...req.body, user_id: req.params.id };
    const newPost = await postModel.insert(postInfo);
    res.status(201).json(newPost);
  } 
  catch(err) {
    next({error: err, message: 'error getting messages', status: 500})
  }
});

// do not forget to export the router
module.exports = router;
