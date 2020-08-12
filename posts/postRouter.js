const express = require('express');
const {validateUser, validateUserId} = require("../middleware/user");
const {validatePost, validatePostId} = require("../middleware/post");
const db = require("../users/userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.get('/', (req, res) => {
    // do your magic!
    postDb.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({message: "Error getting posts"});
        });
});

router.get('/:id', validatePostId(), (req, res) => {
    // do your magic!
    postDb.getById(req.params.id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({message: "Error getting post"});
        });
});

router.delete('/:id', validatePostId(), async (req, res) => {
    // do your magic!
    const delPost = await postDb.getById(req.params.id);
    try {
        postDb.remove(req.params.id);
        res.status(200).json(delPost);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({message: "Error getting post"});
    }
});

router.put('/:id', validatePostId(), validatePost(), (req, res) => {
    // do your magic!
    postDb.update(req.params.id, req.body)
        .then(async changes =>{
            const post = await postDb.getById(req.params.id);
            res.status(200).json(post);
        })
        .catch(err =>{
            console.log(err.stack);
            res.status(500).json({message: "Error updating post"});
        });
});

module.exports = router;
