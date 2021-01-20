const express = require('express');
const User = require("../users/users-model");

const {
  validateUserId,
  validateUser,
} = require('../middleware/middleware')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
User.insert(req.body)
.then(user => {
  res.status(201).json(user)
})
.catch(error => {
  console.log(error);
  res.status(500).json({message: 'error adding user'})
});
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then((user) => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "Cannot get users"})
  })

});

router.get('/:id', validateUserId, (req, res) => {

  User.getById(req.params.id)
.then(user => {
  res.status(200).json(user)
})
.catch(error => {
  res.status(500).json({error: "Cannot get user"})
})
});

router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
  .then(user => {
    if(user > 0) {
      res.status(200).json({message: 'deleted'});
    } else {
      res.status(404).json({message: 'Could not be found'})
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: 'Error removing post', error})
  });

});

router.put('/:id', [validateUserId, validateUser],  (req, res) => {
  User.update(req.params.id, req.body)
  .then(user => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({message: 'post could not be found'})
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: 'Error removing post', error})
  });
});

router.post('/:id/posts', (req, res) => {
const postInfo = {...req.body, id: req.params.id };

User.insert(postInfo)
.then(user => {
  res.status(210).json(user);
})
.catch(error => {
  console.log(error);
  res.status(500).json({message: 'error adding user'})
});

});

router.get('/:id/posts', validateUserId, (req, res) => {
User.getUserPosts(req.params.id)
.then(user => {
  res.status(200).json(user);
})
.catch(error => {
  console.log(error);
  res.status(500).json({message: 'error adding user'})
});
});

// do not forget to export the router
