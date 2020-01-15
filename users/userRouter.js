const express = require('express');

const db = require("../users/userDb.js");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: "The users information could not be found"
    });
  });
});

router.get('/:id', (req, res) => {
  // do your magic!
const userId = req.params.id;

  db.getById(userId)
  .then(specificUser => {
    if (userId) {
      res.status(200).json(specificUser);
    } else {
      res.status(404).json({
        message: "The post with the specific ID does not exist"
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: "The post information could not be retrieved"
    });
  });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const delId = req.params.id;

  db.remove(delId)
  .then(deletedUser => {
    if (!delId) {
      res.status(404).json({
        message: "The post with the specific ID does not exist"
      }) 
    } else {
      res.status(200).json({ deletedUser });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: "The post could not be removed"
    });
  });
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
