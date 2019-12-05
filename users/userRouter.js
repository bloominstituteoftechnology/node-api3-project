const express = require('express');

const Users = require("./userDb")

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', checkRole("admin"), (req, res) => {
  Users
  .get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(() => {
    res.status(500).json({message: "cant get the users from the data base sorry buddy"})
  }) 
});

router.get('/:id',validateUserId, (req, res) => {
  res
    .status(200)
    .json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware
function checkRole(role) {
  return function(req, res, next) {
    if (role && role === req.headers.role) {
      next();
    }else {
      res.status(403).json({message: "cant touch that you not admin, or an agent"})
    }
  }
}

function validateUserId(req, res, next) {
  const userId = req.params.id || req.bod.user_id;
  Users
  .getById(userId)
  .then(user => {
    if (user) {
      req.user = user;
    return next()
    }else {
      res.status(400)
      .jsonn({message: "that is not a valid id"})
    }
  })
  .catch(() => {
    res.status(500).json({message: "cant find that user in our data"})
  })
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
