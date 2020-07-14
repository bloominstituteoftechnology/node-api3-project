const express = require('express');

const mid = require('../midWare');
const Users = require('./userDb')
const router = express.Router();

router.use((req,res,next) =>{
  console.log('in users');
  next();
})

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then( users=> {
      res.status(200).json(users);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the body",
      });
    });
});

router.get('/:id', mid.validateId, (req, res) => {
  // do your magic!
   Users.getById(req.params.id)
     .then((users) => {
       if (users) {
         res.status(200).json(users);
       } else {
         res.status(404).json({ message: "User not found" });
       }
     })
     .catch((error) => {
       // log error to server
       console.log(error);
       res.status(500).json({
         message: "Error retrieving the user",
       });
     });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
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
