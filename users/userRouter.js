const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  users.insert(req.body)
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((error) => {
    res.status(500).json({error: 'error'})
  })
});


  router.post('/:id/posts',validateUserId, validatePost, (req,res) => {
  // const id = req.params.id;
  posts.insert(req.body)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    res.status(500).json({error: 'error'})
  })
})

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((error) => {
    res.status(500).json({error: 'error'})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  users.getById(req.params.id)
    .then((users) => {
      res.status(200).json(users)
    })
  .catch((error) => {
    res.status(500).json({error: 'error'})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    res.status(500).json({error: 'error'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((error) => {
    res.status(500).json({error: 'error'})
  })
})

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((error) => {
    res.status(500).json({error:'error'})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id) 
  .then((id) => {
    if(id) {
      req.user = id;
      next();
    } else{
      res.status(400).json({message: 'error'})
    }
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(Object.keys(req.body).length >= 1 ) {
    if(req.body.name) {
      next()
    } else {
      res.status(400).json({message: 'error'})
    }
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(Object.keys(req.body).length >= 1) {
    if(req.body.text) {
      next()
    } else {
      res.status(400),json({error: 'message'})
    }
  }
}

module.exports = router;
