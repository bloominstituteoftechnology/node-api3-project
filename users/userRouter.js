const express = require('express');

const router = express.Router();

const Users = require('./userDb');
const Posts = require('../posts/postDb.js');

router.post('/', validateUserId, (req, res, next) => {
  // do your magic!
  Users.insert(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(error => {
    next(error);
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // do your magic!
  const postInfo = {...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
  .then(posts => {
    res.status(201).json(posts)
  })
  .catch(error => {
    next(error);
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(error => {
    next(error);
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    next(error);
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(error => {
    next(error);
  })
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    if (count===0) {
      res.status(200).json(count)
    } else {
      res.status(400).json({
        message: 'User could not be found'
      });
    }
  })
  .catch(error => {
    next(error);
  })
});

router.put('/:id', validateUser, (req, res, next) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(user => {
    if(user){
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: 'The user could not be found'
      });
    }
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;

  Users.findById(id) 
  .then(users => {
    if (user) {
      req.user = hub;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
      next(new Error("invalid user id"));
    }
  })
  .catch(error => {
    error.code = 500;
    error.message = 'database error';
    next(error);
  })
}

function validateUser(req, res, next) {
  // do your magic!
  let body = req.body;
  let name = req.body.name;
  if (!body) {
    res.status(400).json({ message: "missing required field" })
  } else if (!name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (req.body && Object.keys(req.body).length > 0) {
    next({ code: 400, message: 'body is required' })
  } else {
    next
  }
}

module.exports = router;
