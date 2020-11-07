const express = require('express');

const router = express.Router();
const User = require('./userDb')
const Posts = require('../posts/postDb')



router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json({message: 'error adding user'})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id};

  Posts.insert(postInfo)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json({message: 'error adding Post'})
  })

});

router.get('/', (req, res) => {
  res.status(201).json({message:'success'})
});

router.get('/:id', validateUserId, (req, res) => {
  User.getById(req.params.id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message:'error retrieving user'})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  User.getUserPosts(req.params.id)
  .then(user => {
      res.status(200).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'error retriving data'})
  })

});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
  .then(user => {
    if (user > 0) {
      res.status(200).json({ message: 'This user has been deleted' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  User.update(req.params.id ,req.body)
  .then(user => {
    res.status(201).json({message: 'update success'})
  })
  .catch(error => {
    res.status(500).json({message: 'error updating user'})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id)
  .then(user => {
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({message: 'id not found'})
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message:'error with request'})
  })
}

function validateUser(req, res, next) {
  if (req.body.name && Object.keys(req.body.name).length > 0 ){
    next();
  } else {
    res.status(400).json({message: 'missing required name field '})
  }
}

function validatePost(req, res, next) {
  if (req.body.text && Object.keys(req.body.text).length > 0 ){
    next();
  } else {
    res.status(400).json({message: 'missing required text field '})
  }
}

module.exports = router;
