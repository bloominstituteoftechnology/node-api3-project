const express = require("express");

const User = require("./userDb");

const router = express.Router();

//TODO: Fix request
//adds a new user
router.post("/", validateUser, (req, res) => {
  // do your magic!
    User.insert(req.body)
        .then(addedUser => {
            res.status(201).json(addedUser);
        })
});

//TODO: Finish last request
//adds a text post to a user
router.post("/:id/posts", validateUserId, validatePost, async (req, res, next) => {
  // do your magic!
    try {
        const addPost = await User.insert(req.body);
        res.status(201).json(addPost);
    } catch (err) {
        next(err);
    }

});

//working...
router.get("/", async (req, res, next) => {
  // do your magic!
    try {
        const getAllUsers = await User.get(req.body);
        res.status(200).json(getAllUsers);
    } catch (err) {
        next(err);
    }
});

//working...
router.get("/:id", validateUserId, (req, res, next) => {
  // do your magic!
    try {
        res.status(200).json(req.user);
    } catch (err) {
        next(err);
    }

});

//working...
router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  User.getUserPosts(req.user.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "Error with getting the user posts." });
    });
});

//working...
router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.user.id)
    .then(removePost => {
      res.status(200).json(removePost);
    })
});

//working...
router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
    User.update(req.user.id, req.body)
        .then( updatedUser => {
            res.status(200).json(updatedUser)
        })
        .catch(error => {
            res.status(500).json({error: 'Error updating user'})
        })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id).then(userId => {
    if (userId) {
      req.user = userId;
      next();
    } else {
      res.status(404).json({ message: "invalid user id" });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  const userBody = req.body;
  if (Object.keys(req.postBody).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!userBody.name) {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const postBody = req.body;
  if (Object.keys(req.postBody).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!postBody.text) {
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;
