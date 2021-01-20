const express = require('express');
const Posts = require("../posts/posts-model")

const {
  validatePostId,
} = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch(error => {
    res.status(500).json({error: "Cannot get posts"})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
.then(posts => {
  res.status(200).json(posts)
})
.catch(error => {
  res.status(500).json({error: "Cannot get posts"})
})
});

//need to review

router.delete('/:id', validatePostId, (req, res) => {
Posts.remove(req.params.id)
.then(posts => {
  if(count > 0) {
    res.status(200).json({message: 'deleted'});
  } else {
    res.status(404).json({message: 'Could not be found'})
  }
})
.catch(error => {
  console.log(error);
  res.status(500).json({error: 'Error removing post', error})
});

});

router.put('/:id', validatePostId, (req, res) => {
Posts.update(req.params.id)
.then(posts => {
  if (posts) {
    res.status(200).json(posts)
  } else {
    res.status(404).json({message: 'post could not be found'})
  }
})
.catch(error => {
  console.log(error);
  res.status(500).json({error: 'Error removing post', error})
});

});

// do not forget to export the router
