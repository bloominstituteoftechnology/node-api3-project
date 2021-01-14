const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model');
const { 
  validateUserId,
  validateUser,
  validatePost,
  serverErrorHandler
} = require('../middleware/middleware');

const router = express.Router();

// curl -d '{"name": "my name"}' -H 'Content-Type: application/json' -X POST http://localhost:5000/api/users
router.post('/', validateUser, async (req, res, next) => {
  const user = req.body;
  try {
    const newUser = await User.insert(user);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// curl -X GET http://localhost:5000/api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// curl -X GET http://localhost:5000/api/users/:id
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(res.user);
});

// curl -X DELETE http://localhost:5000/api/users/:id
router.delete('/:id', validateUserId, async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.remove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// curl -d '{"name": "changed my name"}' -H 'Content-Type: application/json' -X PUT http://localhost:5000/api/users/:id
router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  const id = req.params.id;
  const user = req.body;
  try {
    await User.update(id, user);
    const newUser = await User.getById(id);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// curl -d '{"text": "post text"}' -H 'Content-Type: application/json' -X POST http://localhost:5000/api/users/:id/posts
router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  const post = req.body;
  const id = req.params.id;
  try {
    const newPost = await Post.insert({...post, user_id: id});
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

// curl -X GET http://localhost:5000/api/users/:id/posts
router.get('/:id/posts', validateUserId, async (req, res, next) => {
  const id = req.params.id;
  try {
    const posts = await User.getUserPosts(id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.use(serverErrorHandler);

// do not forget to export the router
module.exports = router;