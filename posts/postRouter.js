const express = require('express');
const posts = require("./postDb");
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts.get()
  .then((posts) => {
    res.status(200).json(posts);
  })
  .catch((err)=> {
    next(err);
  })
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  posts.getById(id)
  .then(posts => res.status(200).json(posts))
  .catch((err)=> {
    next(err);
  })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
posts
.remove(id)
.then((posts) => {
  res.status(200).json({posts})
})
.catch(error =>{
  console.log(error)
  res.status(500).json({message: "The post could not be removed"})
})
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
