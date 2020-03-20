const express = require('express');

const User = require('./userDb');
const Post = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const body = req.body;
  console.log(req.body);
  User.insert(req.body)
  .then(user => {
    if(user) {
      res.status(201).json(user)
    } else {
      res.status(404).json({
        errorMessage: 'Please provide the required text for the post'
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: 'There was an error while saving the user to the database.'
    })
  })
})

//works on Postman

router.post('/:id/posts', [validateUserId, validatePost], async (req, res) => {
  const userInfo = req.body

    try {
        const user = await Post.insert(userInfo);
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "status 500 error"})
}});


router.get('/', (req, res) => {
  User.get(req.query)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json({
      error: 'The user information could not be retrieved.'
    });
  });
});

//works on Postman

router.get('/:id', validateUserId, (req, res) => {
  User.getById(req.params.id)
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: 'The user with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The user information could not be retrieved.'
        })
    })
});

//works on Postman

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const user_id = Number(req.params.id);
    console.log(typeof user_id);
    const users = await User.getUserPosts(user_id);
    res.status(200).json(users);
} catch(err) {
    console.log(err);
    res.status(500).json({
        message: 'Cannot get this post.'
    })
}
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(user => {
        if (user > 0) {
            res.status(200).json({message: 'The user has been nuked'});
        } else {
            res.status(404).json({message: ' The user with the specified ID does not exist.'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The user could not be removed.'
        })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const changes = req.body;
    User.update(req.params.id, changes)
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else if (!user) {
            res.status(404).json({message: 'The user with the specified ID does not exist.'})
        } else {
            res.status(400).json({errorMessage: 'Please provide the name for the user.'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The user information could not be modified.'
        });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  User.getById(id)
  .then(user => {
    if(user) {
      req.user= user;
      next();
    } else{
      res.status(404).json({message: 'User is not available.'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'exception', err});
  })
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({message: 'Missing user data'})
  } else if (!req.body.name) {
    res.status(400).json({message: "Missing required name field"})
  }
  next();
}

function validatePost(req, res, next) {
  const {id: user_id} = req.params;
  const {text} = req.body;
  if(!req.body || !{text}) {
    return res.status(400).json({message: 'Missing post data'})
  } 
  req.body = {user_id, text};
  next();
}

module.exports = router;
