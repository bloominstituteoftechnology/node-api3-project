const express = require('express');

const User = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
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
});

router.post('/:id/user', [validateUserId, validateUser], async (req, res) => {
  const userInfo = {...req.body, user_id: req.params.id};

    try {
        const user = await User.insert(userInfo);
        res.status(201).json(user);
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

router.get('/:id/user', [validateUserId], async (req, res) => {
  try {
    const user_id = Number(req.params.id);
    console.log(typeof user_id);
    const users = await User.getById(user_id);
    if(user_id) {
        res.status(200).json(users);
    } else {
        res.status(404).json({message: 'The user with the specified ID does not exist'})
    }
} catch(err) {
    console.log(err);
    res.status(500).json({
        message: 'Error retriving the messages for this hub.'
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

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  const changes = req.body;
    User.update(req.params.id, changes)
    .then(user => {
        if(user) {
            res.status(200),json(user);
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
      next(new Error(' User does not exist'));
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
}

// function validatePost(req, res, next) {
//   if(!req.body) {
//     res.status(400).json({message: 'Missing post data'})
//   } else if (!req.body.text) {
//     res.status(400).json({message: "missing required text field"})
//   }
// }

module.exports = router;
