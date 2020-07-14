const express = require('express');

const mid = require('../midWare');
const Users = require('./userDb')
const Posts = require('../posts/postDb');
const router = express.Router();

router.use((req,res,next) =>{
  console.log('in users');
  next();
})

router.post("/", mid.validateUser, (req, res) => {
  Users.insert({ name: req.body.name }).then((user) => {
    res.status(200).json(user);
  });
});

router.post("/:id/posts", mid.validateUserId, mid.validatePost, (req, res) => {
  // do your magic!
  Posts.insert({
    user_id: req.params.id,
    text: req.body.text,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error adding users post" });
    });
});

router.get('/', (req, res) => {
  Users.get(req.query)
  // Users.getUserPosts(req.query)
    .then( users=> {
      res.status(200).json(users);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the body",
      });
    });
});

router.get("/:id", mid.validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then((users) => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the user",
      });
    });
});

router.get("/:id/posts", mid.validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then((byPost) => {
      res.status(200).json(byPost);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error getting posts",
      });
    });
});

router.delete('/:id',mid.validateUserId, (req, res) => {
  // do your magic!
    Users.getById(req.params.id)
      .then(async (byeUser) => {
        await Users.remove(req.params.id);
        res.status(200).json(byeUser);
      })
      .catch((error) => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error removing user",
        });
      });
});

router.put('/:id',mid.validateUserId, (req, res) => {
  // do your magic!
    Users.update(req.params.id, {
      name: req.body.name,
    })
      .then((update) => {
        res.status(200).json(update);
      })
      .catch((error) => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error editing user",
        });
      });
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
