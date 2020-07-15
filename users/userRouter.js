const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');
const router = express.Router();

router.use(express.json());

router.use((req, res, next)=>{
  console.log("in the users router!");
  next()
})

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Error adding to database'
    });
  });
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // do your magic!
  const postInfo = {...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
  .then(posts => {
    res.status(201).json(posts)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Could not add posts'
    });
  });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: "Error retrieving the users"
    });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Could not get user from ID'
    });
  });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Can not retrieve post'
    });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
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
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Error removing the user'
    });
  });
});

router.put('/:id', validateUserId, (req, res) => {
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
  const { id } = req.params;
  Users.getById(id)
  .then(user => {
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({
        message: 'Invalid user id'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message:`There was a problem with your ${req.method} request`
    });
  });
};

function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Missing user data'})
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Missing required name field'})
  } else if (req.body) {
    return next()
  }
};

function validatePost(req, res, next) {
  // do your magic!
  if(Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: 'Missing post data'
    })
  } else if (!req.body.text){
    res.status(400).json({
      message: 'Missing required text field'
    })
  } else if (req.body) {
    return next();
  };
};

module.exports = router;
