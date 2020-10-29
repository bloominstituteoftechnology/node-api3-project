const express = require('express');

const Users = require('./userDb')
const Posts = require('../posts/postDb')
const router = express.Router();

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/', (req, res) => {
    Users.get()
  .then((users) => {
    // console.log(users)
    res.status(200).json(users)
  })  
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Unable to retrieve posts"
    })
  })
});

router.post('/', validateUser, (req, res) => {
   Users.insert(req.body)
   .then(post => res.status(201).json({message:`User added`}))
});

router.post('/:id/posts',[validateUserId,validatePost], (req, res) => {
 const newPost = {user_id:req.params.id, text:req.body.text}
 Posts.insert(newPost)
 .then(()=>{ 
    res.status(201).json({message:`Post added`})
  })

});

router.get('/:id/posts',validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then((posts)=>{
    res.status(201).json({message:"I hate ziggs"})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(()=>{
    res.status(202).json({message:"stuff deleted"})
  })
});

router.put('/:id',validateUserId, (req, res) => {
  Users.update(req.params.id)
  .then(()=>{
    res.status(202).json({message:"stuff happened"})
  })
});

//custom middleware

function validateUserId (req, res, next) {
  const { id } = req.params
  Users.getById(id)
  .then(user =>{
     console.log("This is user", user)
    if(user){
      req.user=user
      next()
    }
    else
    {
      res.status(400).json({
        message:"Invalid User"
      })
    }
  })
}

function validateUser(req, res, next) {
  if (!req.body) {
		res.status(400).json({ message: "missing user data" });
	}
	if (!req.body.name) {
		res.status(400).json({ message: "missing required name field" });
	}
	next();
}

function validatePost(req, res, next) {
  if(Object.keys(req.body)==="name" && req.body.name)
    {
      next()
    }
    else
    {
      res.status(404).json({
        message:"Error getting post info, need name and text"
      }) 
    }
}

module.exports = router;
