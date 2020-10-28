const express = require('express');

const router = express.Router();
const usersList = require('./userDb');
const postData = require('../posts/postDb');
router.use(express.json());

router.post('/', validateUser, (req, res) => {
  const data = req.body;
  usersList.insert(data)
  .then(newUser => {
    res.status(201).json({newUser})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      message: "Could not post user data"
    })
  })
  // do your magic!
});

router.post('/:id/posts',validateUserId, validatePost,  (req, res) => {
  const id = req.params.id;
  const data = req.body;
  postData.insert({...data, user_id: id})
  .then(newPost => {
    res.status(201).json({newPost})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Could not post data."})
  })

});

router.get('/', (req, res) => {
  usersList.get()
  .then(users =>{
    res.status(200).json({users})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "error retrieving the users."})
  })
  // do your magic!
});

router.get('/:id',  validateUserId, (req, res) => {
  const id = req.params.id;
  usersList.getById(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({mssage: "Could not retrieve user"})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const id = req.params.id;
  usersList.getUserPosts(id)
  .then(userPosts =>[
    res.status(200).json({userPosts})
  ])
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Could not retrieve Users post."})
  })
});

router.delete('/:id',  validateUserId, (req, res) => {
  const id = req.params.id;
  usersList.remove(id)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(error)
    res.status(500).json({message: "The user could not be removed."})
  })
  // do your magic!
});

router.put('/:id',  validateUserId, validateUser,  (req, res) => {
  const id = req.params.id;
  const data = req.body;
  usersList.insert(id, data)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "The user was not updated"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  userList.getById(id)
  .then(user =>{
    if(user){
      req.user = user;
      next();
    } else {
    res.status(400).json({message: "invalid user id"});
  }})
};

function validateUser(req, res, next) {
  const userData = req.body;
  if(!userData){
    res.status(400).json({message: "missing user data."})
  } else if(!userData.name){
    res.status(400).json({message: "missing required name field."})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const postData = req.body;
  if(!postData){
    res.status(400).json({message: 'missing post data.'})
  } else if(!postData.text){
    res.status(400).json({message: "missing required text field."})
  } else {
    next();
  }
}



module.exports = router;
