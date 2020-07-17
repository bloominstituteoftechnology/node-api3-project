const express = require('express');
const Users = require('../users/userDb');

const router = express.Router();

router.use(validateUser);
router.use(validateUserId);
router.use(validatePost);

function getHandler(req, res) {
  Users.find(req.query)
  .then(usr => {
    res.status(200).json(usr);
  })
  .catch(err => {
    res.status(500).json({
      message: 'Error retrieving the user',
    })
  })
}

router.post('/', (req, res) => {
  // do your magic!
  Users.add(req.body)
  .then(usr => {
    res.status(201).json(usr);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Error adding the User',
    })
  })
});

router.post('/:id/posts', [validateUserId, requireBody], (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
  .then(usr => {
   if(usr){
    res.status(200).json(usr);
   } else {
     res.status(404).json({message: 'The users post could not be found'})
   }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: 'Error updating the user', err})
  })
});

router.get('/', getHandler);

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.usr)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Users.findUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Error getting the Post for the user'
    })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({message: 'The user has been eliminated'})
    } else {
      res.status(404).json({message: 'Teh User could not be found'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error removing the user', err})
  })
});

router.put('/:id', [validateUserId, requireBody], (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(usr => {
      if (usr) {
        res.status(200).json(usr);
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error updating the user', error });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  Users.findById(id)
  .then(usr => {
    if (usr) {
      req.usr = usr;
      next();
    } else {
      // res.status(404).json({ message: 'does not exist' });
      next(new Error('does not exist'));
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'exception', err });
  });

}

function validateUser(req, res, next) {
  // do your magic!
  req.user = req.user || 'sk';
  next()
}


function requireBody(req, res, next) {
  const body = req.body;
  !body || body === {} ?
  res.status(400).json({message: 'Please include request body'})
  : 
  next();
}

module.exports = router;
