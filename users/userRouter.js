const express = require('express');

const router = express.Router();
const userdb= require('./userDb')
const postdb = require('../posts/postDb')

router.post('/', validateUser(), (req, res) => {
  // do your magic!
  userdb.insert(req.body)
  .then((user) => {
    res.status(201).json(user)
  })
  .catch((error) => {
    next(error)
  })
});

router.post('/:id/posts',  validatePost(), (req, res) => {
  // do your magic!
  const {text} = req.body
  const {id: user_id} = req.params
  postdb.insert ({text, user_id})
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/', (req, res) => {
  // do your magic!
  userdb.get()
  .then ((user) => {
    res.status(200).json(user)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  console.log(req.user)
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  userdb.getUserPosts(req.params.id)
  .then((post) => {
    res.status(200).json(post)
  })
  .catch((error) => {
    next(error)
  })
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  userdb.remove(req.params.id)
  .then ((count) => {
    res.status(200).json({
      message : "successfully deleted user"
    })
  })
  .catch((error) => {
    next(error)
  })
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  // do your magic!
  userdb.update(req.params.id, req.body)
  .then ((user) => {
    res.status(200).json(user)
  })
  .catch((error) => {
    next(error)
  }) 
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
  userdb.getById(req.params.id)
  .then((user) => {
    console.log(user)
    if (user) {
      req.user = user
      next()
    } else {
        res.status(404).json({
          message: "invalid user id"
        })
      }
    })
    .catch((error) => {
      next(error)
    })
  }
}


function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing user data"
      })
    }
    if (!req.body.name) {
      return res.status(400).json({
        message: "missing required name field"
      })
    }
    next();
    }
  }

function validatePost() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "missing post data"
      })
    }
    if (!req.body.text) {
      return res.status(400).json({
        message: "missing required text field"
      })
    }
    next()
  }
}

module.exports = router;
