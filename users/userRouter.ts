const express = require("express");
const {validateUser, validateUserId} = require("../middleware/user");
const {validatePost, validatePostId} = require("../middleware/post");
const db = require("../users/userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser(), (req, res) => {
    // do your magic!
    //todo: what is supposed to be posted to "/" .....? This project is really messy and hard to follow
    db.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({message: "Error creating new user"});
        });
});

router.post("/:id/posts", validatePostId(), validatePost(), (req, res) => {
    // do your magic!
    postDb.insert(req.body)
        .then(post => {
            res.status(200).json({postCreated: post});
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({message: "Error posting comment"});
        })
});

router.get("/", (req, res) => {
    // do your magic!
    db.get()
        .then(users => {
            res.status(200).json({users: users});
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({message: "Error trying to get users"});
        });

});

router.get("/:id", validateUserId(), (req, res) => {
    // do your magic!
    db.getById(req.params.id)
        .then(user => {
            res.status(200).json({user: user});
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({message: "Error finding user"});
        })
});

router.get("/:id/posts", validatePostId(), (req, res) => {
    // do your magic!
    db.getUserPosts(req.params.id)
        .then(userPosts => {
            res.status(200).json({posts: userPosts});
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({message: "Error getting user posts"});
        });
});

router.delete("/:id", validateUserId(), async (req, res) => {
    // do your magic!
    const delUser = await db.getById(req.params.id);
    try {
        db.remove(req.params.id);
        res.status(200).json({userDeleted: delUser});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({message: "Error deleting user"});
    }
});

router.put("/:id", validateUserId(), validateUser(), (req, res) => {
    // do your magic!
    db.update(req.params.id, req.body)
        .then(async changes => {
            const [user] = await db.getById(req.params.id);
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({error: "The user information could not be modified."});
        });

});

module.exports = router;
