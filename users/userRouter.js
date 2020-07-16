// Express 
const express = require('express');
const router = express.Router();

//  POST Database 
const postDB = require('../posts/postDb');

// ### USER Database ###
const userDB = require('./userDb');

//  MIDDLEWARE 
const cm = require('../middleware/middleware')
const validateUserId = cm.validateUserId
const validateUser = cm.validateUser
const validatePost = cm.validatePost


//  POST ADDS USER 
router.post('/', validateUser, (req, res) => {
  // do your magic!
  const { name } = req.body;

  userDB.insert({ name: name })
  .then(user => {res.status(201).json(user);})
  .catch(err => {res.status(500).json({ error: "Could not add user to database." });
  })
});

//  POST USER ADDS POSTS --> api/users/:id/posts
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  // db.
  const id = req.params.id;

  postDB.insert({ user_id: id, text: req.body.text })
    .then(post => {res.status(201).json(post);})
    .catch(error => {res.status(500).json({ message: "Could not add post to database." });
    })
});

// GET LIST OF ALL USERS
router.get('/', (req, res) => {
  // do your magic!
  userDB.get()
  .then(users => {
    if (users) {res.status(200).json(users);

  } else {res.status(404).json({errorMessage: "No users found!"});}})
  .catch(error => {
    res.status(500).json({error: "There was an error retrieving users from database." })
  })
});

//  GET INDIVIDUAL USER --> api/users/:id/posts  
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);

});

//  GET Specified user Posts by id
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userDB.getUserPosts(id)
  .then(posts => {
    if (posts.length > 0 ) {
    res.status(200).json(posts);
  } else {res.status(404).json({errorMessage: "No posts found for the specified user" });}})
  .catch(error => {
    res.status(500).json({error: "Could not get posts by user." });
  });

});

// DELETE User by their id
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  userDB.remove(req.user.id)
  .then(() => {res.status(200).json({Success: true})})
  .catch(error => {res.status(500).json({error: "Could not delete the specified user." });
  })
});

//  UPDATE User by id 
router.put('/:id', validateUserId,validateUser, (req, res) => {
  // do your magic!
  const id = req.params.id;

  userDB.update(id, {name: req.body.name })
  .then(() => {db.getById(id)
  .then(user => {res.status(200).json(user);});})
  .catch(error => {res.status(500).json({errorMessage: "Could not get the updated user "});
  });
});



module.exports = router;