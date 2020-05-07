const express = require('express');

const User = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/',validateUser, (req, res) => {
  // do your magic!
  db.get()
  .then()
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error:"sorry couldnt get users"})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  // const { id } = req.params;
  res.status(200).json(req.user)
  // User.getById(id)
  // .then(user => {
  //   if (user) {
  //     res.status(200).json(user)
  //   }else {
  //     res.status(404).json({error: "Sorry, user with that ID does not exist"})
  //   }
  // })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  User.getUserPosts(id)
  .then(posts => res.status(200).json(posts))
  .catch(err => {
    console.log(err);
    res.status(404).json({error:"Error getting user posts"})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.user;
  User.remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({error:"Sorry error deleting user"})
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const { name } = req.body;
  User.update(id, {name})
        .then(updated => {
          if (updated) {
            User.getById(id)
            .then(user => res.status(200).json(user))
            .catch(err => {
              console.log(err);
              res.status(500).json({error: "Error getting user"})
            })
          }
          
       })
       .catch( err => {
         console.log(err);
         res.status(500).json({error: "Error updating user"})
       });
});
    
     

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  User.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({message: "Sorry invalid user ID"});
      }
    })
    .catch((err) => {
      res.status(500).json({errorMessage:"Error connecting"})
    })
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
