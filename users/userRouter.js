const express = require('express');

const router = express.Router();

const userdb = require('./userDb');
const postdb = require('../posts/postDb');
router.use("/:id", validateUserId);

router.post('/', validateUser, (req, res) => {
    // do your magic!
    userdb.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('Error:', err);
            res.status(500).json({ error: "There was an error creating a user." })
        })
});

router.post('/:id/posts', validatePost, (req, res) => {
    const postId = req.params.id
    const postInfo = {...req.body, user_id: postId }
        // do your magic!
    postdb.insert(postInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('Error:', err);
            res.status(500).json({ error: "There was an error creating a post." })
        })
});

router.get('/', (req, res) => {
    // do your magic!
    userdb.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log("Error: ", err);
            res.status(500).json({ Error: "the information requested could not be retrieved." });
        });
});

router.get('/:id', (req, res) => {
    // do your magic!
    res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
    // do your magic!
    userdb.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(500).json({ message: "There was a problem retrieving user posts." })
        })
});

router.delete('/:id', (req, res) => {
    // do your magic!
    const id = req.params.id;
    userdb.remove(id)
        .then(user => {
            res.status(200).json({ message: "User was deleted.", user: req.user });
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ error: "the user id could not be deleted." })
        })
});

router.put('/:id', validateUser, (req, res) => {
    // do your magic!
    const id = req.params.id

    userdb.update(id, req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(500).json({ message: "There was a problem updating user ." })
        })
});

//custom middleware

function validateUserId(req, res, next) {
    // do your magic!
    userdb.getById(req.params.id)
        .then(user => {
            if (user) {
                req.user = user
                next();
            } else {
                res.status(400).json({ message: "Invalid user id." });
            }
        })
        .catch(err => {
            console.log('error:', err);
            res.status(500).json({ message: `There was a problem with your ${req.method} request` })
        })
}

function validateUser(req, res, next) {
    // do your magic!
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            res.status(400).json({ message: "Missing required name field." })
        }
    } else {
        res.status(400).json({ message: "Missing user data." });
    }
};

function validatePost(req, res, next) {
    // do your magic!
    if (req.body) {
        if (req.body.text) {
            next();
        } else {
            res.status(400).json({ message: "Missing required text field." })
        }
    } else {
        res.status(400).json({ message: "Missing post data." });
    }
}

module.exports = router;