const express = require('express');
const Users = require('./userDb')
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!

});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then(userData=>{
        res.status(200).json(userData)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({message: 'Error retrieving data'})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user =>{
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'there is no post with that id'})
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: 'Error retrieving data'
        })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(posts=>{
      res.status(200).json(posts)
    })
    .catch(err=>{
      res.status(500).json({
          message: 'unable to retrieve posts'
      })
    })
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
