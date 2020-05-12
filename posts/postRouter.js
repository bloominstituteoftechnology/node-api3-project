const express = require('express');

const { 
  validateUserId,
  validateUser,
  validatePost
} = require("../middleware")

const DB = require("./postDb");
const router = express.Router();

router.get('/', (req, res) => {
  DB.get()
  .then(response => res.status(200).json(response))
  .catch(err => res.status(500).json("sum ting wong"))
});

router.get('/:id', (req, res) => {

});

router.post('/', validatePost, async (req, res) => {
  const post = await DB.insert(req.body)
  if (post) {
    return res.status(201).json(post)
  }
  res.status(500).json("Oof.")
})

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
