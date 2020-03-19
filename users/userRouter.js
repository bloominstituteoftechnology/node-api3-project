const express = require('express');

const User = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  User.insert(req.body)
  .then(post => {
    if(post) {
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
      error: 'There was an error while saving the post to the database.'
    })
  })
});

router.post('/:id/posts', async (req, res) => {
  const userInfo = {...req.body, post_id: req.params.id};

    try {
        const comment = await User.insert(userInfo);
        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({err})
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

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'The post information could not be retrieved.'
        })
    })
});

router.get('/:id/posts', async (req, res) => {
  try {
    const user_id = Number(req.params.id);
    console.log(typeof user_id);
    const users = await User.getUserPosts(user_id);
    if(user_id) {
        res.status(200).json(users);
    } else {
        res.status(404).json({message: 'The post with the specified ID does not exist'})
    }
} catch(err) {
    console.log(err);
    res.status(500).json({
        message: 'Error retriving the messages for this hub.'
    })
}
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
