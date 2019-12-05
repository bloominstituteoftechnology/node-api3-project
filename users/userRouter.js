const express = require('express');

const validatePost   = require('../middleware/validatePost')
const validateUserId = require('../middleware/validateUserId');
const validateUser   = require('../middleware/validateUser');

const router = express.Router();

const db = require('./userDb')


router.post('/', validateUser, (req, res) => {
  // do your magic!
  db.insert(req.body)
  .then(user => {
    res.status(201).json({message: `${req.body.name} was added`})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Error adding the user." })
  })
});

// router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
//   // do your magic!
//   db.insert({...req.body})
//   .then(post => {
//     res.status(201).json({post})
//   })
//   .catch(error => {
//     console.log(error)
//     res.status(500).json({ message: "Error adding post" })
//   })
// });

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(get => {
    res.status(200).json({messageOFTheDay: process.env.MOTD, get})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Error retrieving users." })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  db.getById(req.params.id)
  .then(get => {
    res.status(200).json(get)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Error retrieving user." })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "Error getting user's posts." })
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
  .then(gone => {
    if(gone !== 0){
      res.status(200).json({ message: `The user  with id ${req.params.id}, ${req.body.name} has been deleted.` })
    }else{
      res.status(404).json({  message: "The user could not be found." })
    }
  })
  .catch(error => {
    res.status(500).json({ error, message: "Error deleting the user." })
  })
})

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
  .then(change => {
      res.status(201).json(change)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Error updating user"})
  })

});

//custom middleware

//function validateUserId(req, res, next) {
  // do your magic!
//}

//function validateUser(req, res, next) {
  // do your magic!
//}

//function validatePost(req, res, next) {
  // do your magic!
//}

module.exports = router;
