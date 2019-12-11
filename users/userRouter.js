const express = require('express');

// const logger = require('../server')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
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

function validateUserId() {
  return (req, res, next) => {
    try {
      userId.getById(req.body.id)
      if (!id) {
        return res.status(400).json({ message: "missing user data" })
      }

      const name = await.db.getById(req.body.id)
      if (!name) {
        return res.status(400).json({ message: "missing required name field" })
      }

      const newUser = await db.getById(req.body)
      return res.status(200).json(newUser)
    }
    catch (err) {
      return (err)//res.status(500).json({ errorMessage: "New User not setup." })
    }
    next()
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
