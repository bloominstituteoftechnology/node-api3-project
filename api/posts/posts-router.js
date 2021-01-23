const express = require('express');

const Posts = require('./posts-model.js');
const { validatePost } = require('../middleware/middleware')
const router = express.Router();

router.get('/', validatePost, (req, res,next) => {
  // Get the posts db
  Posts.get()
    .then(posts => {
      console.log('samplier get req ',posts[0].text)
      res.status(200).json(posts);
    })
    .catch(er =>{
      next(er);
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.delete('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});

router.put('/:id', (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
});


router.use((error, req, res, next) => {
  res.status(500).json({
    info: 'something horrible happened inside the hubs router',
    message: error.message,
    stack: error.stack,
  })
})



// do not forget to export the router
module.exports = router;