const express = require('express');

const Posts = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(201).json(posts)
    })
    .catch(err => {
      console.log(err)
    })

  });



router.get('/:id', (req, res) => {
  router.get('/:id', validatePostId, (req, res) => {
    Posts.getById(req.params.id)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error:"Error finding post data"})
    })
  });
});

router.delete('/:id',validatePostId, (req, res) => {
  Posts.remove(req.params.id)
  .then(post => {
    res.status(204).json(post)
  })
  .catch(err => {
    console.log(err)
  })
});

router.put('/:id', (req, res) => {
  const changes = req.body;

  Posts.update(req.params.id, changes)
    .then(update => {
      res.status(200).json(updated)
    })
    .catch(err => {
      console.log(err)
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
  .then(resource => {
    if(resource){
      req.post = resource;
      next();
    } else {
      res.status(400).json({message:"invalid psot id"})
    }
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = router;
