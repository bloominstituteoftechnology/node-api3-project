const express = require('express');

const router = express.Router();
const Users = require('./userDb')

function validateUserId(req, res, next){
  const id = req.params.id
  Users.getById(idVal)
    .then(user=>{
      if (!user){
        res.status(404).json({error: 'Could not find user'})
      } else {

         next()
      }
    })
}
function validateUser(req, res, next) {
  if (!req.body.name){
    res.status(400).json({error: 'user name is required in the body'})
  } else {
    next()
  }
}


router.post('/', (req, res) => {
  if(!req.body.name) {
    res.status(400).json({error: 'We need a name in order to add user'})
  } else {
    Users.insert(req.body)
      .then(postRes=>{
        res.status(201).json({postRes})
      })
      .catch(err=>{
        console.log('post err', err)
        res.status(500).json({errorMessage: 'Failed to save user'})
      })
  }  
});

// router.post('/:id/posts', (req, res) => {
//   // do your magic!
// });

router.get('/', (req, res) => {
  Users.get()
    .then(usersList=>{
      res.status(200).json({usersList})
    })
    .catch(err=>{
      res.status(500).json({errorMessage: 'Failed to get users'})
    })
});

// router.get('/:id', (req, res) => {
//   // do your magic!
// });

// router.get('/:id/posts', (req, res) => {
//   // do your magic!
// });

// router.delete('/:id', (req, res) => {
//   // do your magic!
// });

// router.put('/:id', (req, res) => {
//   // do your magic!
// });

// //custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
