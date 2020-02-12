const express = require('express');
const postDatabase = require('./postDb');

const router = express.Router();

// /api/user/posts
router.get('/', (req, res) => 
{
  postDatabase.get()
  .then(posts =>
  {
    res.status(200).json(posts);
  })  
  .catch(err =>
  {
    res.status(500).json({message: 'could not retrieve posts'});
  })
});

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
