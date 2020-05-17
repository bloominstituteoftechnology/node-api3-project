const express = require('express');
const DBmethods = require('./userDb');
const DBmethods2 = require('../posts/postDb');
const router = express.Router();

router.use(express.json())

router.post('/', (req, res) => {
  DBmethods.insert(req.body)
    .then(res => {
      res.status(201).json({res})
    })
    
});

router.post('/:id/posts',validateUser, (req, res) => {
  const body = req.body;
  body.user_id = req.params.id
  DBmethods2.insert(body)
    .then(resp => {
      res.status(201).json({resp})
    })
    .catch(err => {
      res.status(400).json({message: 'something went wrong!'})
    })
});

router.get('/', (req, res) => {
  DBmethods.get()
    .then(resp => {
      res.status(200).json({resp})
    })
    .catch(err => {
      res.status(404).json({message: 'something went wrong!'})
    })
});

router.get('/:id',validateUserId, (req, res) => {
  DBmethods.getById(req.params.id)
    .then(resp => {
      res.status(200).json({resp})
    })
    .catch(err => {
      res.status(404).json({message: 'something went wrong!'})
    })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  DBmethods.getUserPosts(req.params.id)
    .then(resp => {
      res.status(200).json({resp})
    })
    .catch(err => {
      res.status(404).json({message: 'users posts not found'})
    })

});

router.delete('/:id',validateUserId, (req, res) => {
  DBmethods.remove(req.params.id)
    .then(resp => {
      res.status(200).json({resp})
    })
    .catch(err => {
      res.status(404).json({message: 'something went wrong!'})
    })
});

router.put('/:id',validatePost, (req, res) => {
  console.log(req.body)
  DBmethods2.update(req.params.id, req.body)
    .then(resp => {
      console.log(req.body)
      res.status(200).json({resp})
    })
    .catch(err => {
      res.status(404).json({message: 'something went wrong!'})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  DBmethods.getById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(400).json({message: 'user id not valid!'})
      } else {
        next()
      }
    })
    

}

function validateUser(req, res, next) {
  DBmethods.getById(req.params.id)
    .then(user => {
        if(user){
          next()
        } else {
          res.status(404).json({message: 'user not found'})
        }
    })
    .catch(err => {
      res.status(500).json({message: 'something went wrong'})
    })
}

function validatePost(req, res, next) {
  DBmethods2.getById(req.params.id)
    .then(post => {
      if(post){
        next()
        // res.status(200).json({post})
      } else {
        res.status(404).json({message: 'post doesnt exist'})
      }
    })
    .catch(err => {
      res.status(500).json({message: "server is down"})
    })
}

module.exports = router;
