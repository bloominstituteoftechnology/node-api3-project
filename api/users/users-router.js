const express = require('express');
const Users = require('./users-model.js')
const Posts = require('../posts/posts-model.js')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const mw = require("../middleware/middleware.js");

const router = express.Router();

router.get('/', (req, res) => {
    Users.get()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(error=>{
        console.log(error.message)
        res.status(500).json(error.message)
    })
});

router.get('/:id', mw.validateUserId, (req, res) => {
    res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res) => {
    Users.insert(req.body)
    .then(user=>{
        res.status(201).json(user)
    })
    .catch(error=>{
        console.log(error.message)
        res.status(500).json(error.message)
    })
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
    Users.update(req.params.id, req.body)
    .then(async ()=>{
        const updatedUser = await Users.getById(req.params.id)
        res.status(200).json(updatedUser)
    })
    .catch(error=>{
        console.log(error.message)
        res.status(500).json(error.message)
    })
});

router.delete('/:id', mw.validateUserId, async (req, res) => {
    const user = await Users.getById(req.params.id)
    Users.remove(req.params.id)
    .then(()=>{
        res.status(200).json(user)
    })
    .catch(error=>{
        console.log(error.message)
        res.status(500).json(error.message)
    })
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
    Users.getUserPosts(req.params.id)
    .then(posts=>{
        res.status(200).json(posts)
    })
    .catch(error=>{
        console.log(error.message)
        res.status(500).json(error.message)
    })
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, (req, res) => {
    const newPost = Object.assign(req.body, {user_id:req.params.id})
    console.log(newPost)
    Posts.insert(newPost)
    .then(async post=>{
        res.status(201).json(post)
    })
    .catch(error=>{
        console.log(error.message)
        res.status(500).json(error.message)
    })
});

module.exports = router