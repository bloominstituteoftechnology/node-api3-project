const express = require('express');
const Helpers = require('../users/userDb.js');
const Posts = require('./postDb.js');

const router = express.Router();

router.use((req, res, next)=>{
  console.log("in the posts router!");
  next()
})

router.get('/', (req, res) => {
  Posts.get()
  .then(posts =>{
    res.status(200).json(posts);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({message: 'error retrieving posts'});
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
