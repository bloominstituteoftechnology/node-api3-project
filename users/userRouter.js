const express = require('express');

const router = express.Router();

const db = require('./userDb.js');

router.post('/', validateUser, (req, res) => {
  db.insert(req.body).then(user => {
      res.status(200).json(user);
  })
  .catch(err => {
      res.status(500).json({ error: "There was an error while saving the user to the database" });
  });
});

router.post('/:id/posts', validatePost, (req, res) => {
  
});

router.get('/', (req, res) => {
  db.get().then(users => {
      res.status(200).json(users);
  })
  .catch(err => {
      res.status(500).json({ error: "There was an error while getting users from the database" });
  });
});

// #region dfasfasfas



// #endregion

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.params.id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({message: `Could not retrieve user's posts.`});
    })
  });

router.delete('/:id', validateUserId, (req, res) => {
  db.remove(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" });
    });
});

router.put('/:id', validateUser, (req, res) => {
  db.update(req.params.id, req.body).then(user => {
      if(user){
          res.status(200).json(user);
      }
      else{
          res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
  })
  .catch(err => {
      res.status(500).json({ error: "The user information could not be modified." });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  console.log('id: ', req.params.id);
  db.getById(req.params.id).then(user => {
      if(user){
          req.user = user;
          next();
      }
      else{
          res.status(404).json({ message: "invalid user idccccc" });
      }
  })
  .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved."});
  });
}

function validateUser(req, res, next) {
  if (req.body){
    if (!req.body.name){
      res.status(400).json({ message: "missing required name field" });
    }
    else{
      next();
    }
  }
  else{
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  if (req.body){
    if (!req.body.text){
      res.status(400).json({ message: "missing required text field" });
    }
  }
  else{
    res.status(400).json({ message: "missing post data" });
  }
  console.log('Post validated');
  next();
}

module.exports = router;
