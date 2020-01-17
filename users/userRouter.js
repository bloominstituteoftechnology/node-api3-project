const express = require('express');
const router = express.Router();
const users = require("./userDb");
const posts =require("../posts/postDb");
​
router.post('/', validateUser, (req, res) => {
  // do your magic!
  users.insert(req.body)
  .then(user => {
    res.status(201)
    .json(user);
  });
});
​
router.post('/:id/posts', validateUser, validatePost, (req, res) => {
  // do your magic!
  const newBody = { ...req.body, user_id: req.params.id };
​
  posts.insert(newBody)
  .then(post => {
    res.status(201)
    .json(post);
  });
});
​
router.get('/', (req, res) => {
  // do your magic!
  users.get()
      .then(users => {
      res.status(200)
      .json(users);
    })
    .catch(err => {
      console.log("error on GET /users", err);
      res.status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
​
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.getById(req.params.id)
    .then(user => {
      res.status(200)
      .json(user);
    });
});
​
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200)
      .json(posts);
    });
});
​
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    .then(response => {
      res.status(200)
      .json({ message: "User deleted successfully" });
    });
});
​
router.put('/:id', (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then(post => {
      res.status(200)
      .json(post);
    });
});
​
//custom middleware
​
function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id)
      .then(user => {
      if (user) {
        next();
      } else {
        res.status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
      .catch(err => {
      res.status(500)
        .json({ err: "The user information could not be retrieved." });
    });
}
​
function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(body).length === 0){
    res.status(400)
    .json({message:'missing user data'})
  }else if(!req.body.name){
    res.status(400)
    .json({message: 'missing required name field'})
  } else {
    next();
  }
}
​
function validatePost(req, res, next) {
  // do your magic!
  if (!req.body){
    res.status(400)
    .json({message:'missing user data'})
  }else if(!req.body.text){
    res.status(400)
    .json({message: 'missing required name field'})
  } else {
    next();
  }
}
​
module.exports = router;
