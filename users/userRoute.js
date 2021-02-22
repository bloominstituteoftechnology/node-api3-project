const express = require("express");

const router = express.Router();
const userdb = require("./userDb");
const postdb = require("../posts/postDb");
router.use("/:id", validateUserId);

router.post("/", validateUser, (req, res) => {
    // do your magic!
    userdb
        .insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log("Add User Error:", err);
            res.status(500).json({
                errmessage: "There was an error creating a user."
            });
        });
});

router.post("/:id/posts", validatePost, (req, res) => {
    const userId = req.params.id;
    const post = { ...req.body, user_id: userId };
    // do your magic!
    postdb
        .insert(post)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            console.log("Create User Post Error:", err);
            res.status(500).json({
                errmessage: "There was an error creating a post."
            });
        });
});

router.get("/", (req, res) => {
    // do your magic!
    userdb
        .get()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log("User Get Error: ", err);
            res.status(500).json({ error: "Users could not be retrived" });
        });
});

router.get("/:id", (req, res) => {
    // do your magic!
    res.status(200).json(req.user);
});

router.get("/:id/posts", (req, res) => {
    // do your magic!
    userdb
        .getUserPosts(req.params.id)
        .then(posts => res.status(200).json(posts))
        .catch(err => {
            console.log("get user post err:", err);
            res.status(500).json({ errmessage: "Posts Could Not Be Retrived" });
        });
});

router.delete("/:id", (req, res) => {
    // do your magic!
    userdb
        .remove(req.params.id)
        .then(user =>
            res.status(200).json({ message: `User has been deleted` })
        )
        .catch(err => {
            console.log("Delete User Error:", err);
            res.status(500).json({ errmessage: "User Could not be deleted" });
        });
});

router.put("/:id", validateUser, (req, res) => {
    // do your magic!
    const userId = req.params.id;

    userdb
        .update(userId, req.body)
        .then(() => {
          res.status(200).json({
              message: "User has been updated."
            });
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).json({
                message: "There was a problem updating user ."
            });
        });
});

//custom middleware

function validateUserId(req, res, next) {
    // do your magic!
    userdb
        .getById(req.params.id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({ message: "Invalid user id." });
            }
        })
        .catch(err => {
            err => {
                console.log("Get User By Id Error:", err);
                res.status(500).json({
                    message: `There was a problem retriving the user`
                });
            };
        });
}

function validateUser(req, res, next) {
    // do your magic!
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            res.status(400).json({ message: "Missing required name field." });
        }
    } else {
        res.status(400).json({ message: "Missing user data." });
    }
}

function validatePost(req, res, next) {
    // do your magic!
    if (req.body) {
        if (req.body.text) {
            next();
        } else {
            res.status(400).json({ message: "Missing required text field." });
        }
    } else {
        res.status(400).json({ message: "Missing post data." });
    }
}

module.exports = router;