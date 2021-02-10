const express = require('express');

const Posts = require('./posts-model');
const mw = require('../middleware/middleware');

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE POSTS
router.get('/', (req, res) => {
  Posts.get(req.query)
  .then((posts) =>[
    res.status(200).json(posts)
  ])
  .catch((error) =>{
    res.status(500).json({message: 'Error retrieving posts'});
  })
});

router.get('/:id', (req, res) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
});

// do not forget to export the router
module.exports = router;
