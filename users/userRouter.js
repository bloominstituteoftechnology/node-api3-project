const express = require ('express');
const Users = require ('./userDb.js');
const Posts = require ('../posts/postDb');
const router = express.Router ();

router.post ('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert (req.body)
    .then (newUser => {
      res.status (201).json (newUser);
    })
    .cath (error => {
      console.log (error);
      res.status (500).json ({message: 'there was an issue adding user.'});
    });
});

router.post ('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
  Posts.insert ({...req.body, user_id: req.params.id})
    .then (newPost => {
      res.status (201).json (newPost);
    })
    .cath (error => {
      console.log (error);
      res.status (500).json ({message: 'there was an issue adding posts.'});
    });
});

router.get ('/', (req, res) => {
  // do your magic!
  Users.get ()
    .then (users => {
      res.status (200).json (users);
    })
    .catch (error => {
      console.log (error);
      res.status (500).json ({message: 'failed to get users.'});
    });
});

router.get ('/:id', (req, res) => {
  // do your magic!
  Users.getById (req.params.id)
    .then (users => {
      res.status (200).json (users);
    })
    .catch (error => {
      console.log (error);
      res.status (500).json ({message: 'failed to get users by id.'});
    });
});

router.get ('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete ('/:id', (req, res) => {
  // do your magic!
});

router.put ('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId (req, res, next) {
  // do your magic!
}

function validateUser (req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing user data"})
  }else if(!req.body.name){
    res.status(400).json({message : "missing required name feild"})
  }else{
    next();
  }
  }

function validatePost (req, res, next) {
  // do your magic!
}

module.exports = router;
