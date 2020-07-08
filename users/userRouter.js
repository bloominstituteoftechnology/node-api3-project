const express = require('express');

const Users = require('./userDb'); 

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

// validateUserId()

// validateUserId validates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }

function validateUserId(req, res, next) {
 
  const id = req.params.id
  
  Users.getById(id)
    .then(userObject => {
      if(userObject){
      req.user = userObject; 
      next(); 
      } else {
        res.status(400).json({ message: "invalid user id"})
      } 
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: "could not validate ID"})
    })
  
}


// validateUser()

// validateUser validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }

function validateUser(req, res, next) {
  
  Users.insert(req.body)
    .then(userObject => {
        if(!userObject){
          res.status(400).json({ message: "missing user data"})
        } else if (!userObject.name){
          res.status(400).json({ message: "missing required name field"})
        } else {
          next(); 
        }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: "could not post new user"})
    })
}


// validatePost()

// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }


function validatePost(req, res, next) {
  
  Users.insert(req.body)
  .then(postObject => {
    if(!postObject) {
      res.status(400).json({ message: "missing post data"})
    } else if (!postObject.text) {
      res.status(400).json({ message: "missing required text field"})
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: "could not create new post"})
  })

}



module.exports = router;
