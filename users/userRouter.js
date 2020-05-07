const express = require('express');

const User = require('./userDb.js');
const Post = require('../posts/postDb.js');

const router = express.Router();

router.post('/',validateUser, (req, res) => {
  // do your magic!
 const user = req.body;

 User.insert(user)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: "Error inserting user"});
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { id} = req.params;
  const { text } = req.body;

  Post.insert({id, text})
  .then(post => {
    res.status(201).json(post);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:"Error adding post"})
  })
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
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({error: "Name required"});
  }
  if (typeof name !== 'string'){
    return  res.status(400).json({error: "Name must be letters/string"});
  }
  req.body = { name };
  next();
}



function validatePost(req, res, next) {
  // do your magic!
  const {id} = req.param
  const { text } = req.body;

  if (!req.body) {
    return res.status(400).json({error: "Post requires body"})
  }
  if (!text) {
    return res.status(400).json({error: "Post requires text"})
  }

  // req.body = {user_id, text };
  next();
}

module.exports = router;
