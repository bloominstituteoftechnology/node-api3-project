const express = require("express");
const users = require("./userDb");
const.posts = require("../posts/postDb");
const e = require("express");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "There was an error while adding the user to the database."});
    })
});

router.post("/:id/posts", validatePost, (req, res) => {
  const post = { ...req.body, user_id: req.params.id };
  
  posts.insert(post)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "There was an error while saving the post to the database." });
    });
});

router.get("/users", (req, res) => {
  users.get()
    .then(user => {
      res.status(200).json(users);
    }) 
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The user's information could not be retrieved." })
    })
});

router.get("/:id", validateUserId, (req, res) => {
  users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
  })
});

router.get("/:id/posts", validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
  })
});

router.delete("/:id", validateUserId, (req, res) => {
  users.remove(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
  })

});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  posts.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error);
  })
});

//custom middleware
function validateUserId(req, res, next) {
  users.getById(req.params.id)
  .then(user => {
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "Invalid user ID." })
    }
  })
}

function validateUser(req, res, next) {
  if (req.body || req.name) {
    next();
  } else {
    res.status(404).json({message: "Missing user information." })
  }
}

function validatePost(req, res, next) {
  if (body) {
    req.body = body;
    next();
  } else {
    res.status(400).json({ message: "Missing post information." })
  }
}

module.exports = router;
