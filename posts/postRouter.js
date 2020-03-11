const express = require('express');

const router = express.Router();

const db = require('./postDb');

router.get('/', async (req, res) => {
  try {
      let posts = await db.get()
      res.status(200).json(posts)
  } catch (err) {
      console.error(err)
      res.status(500).json({ error: "The posts information could not be retrieved." })
  }
})

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
