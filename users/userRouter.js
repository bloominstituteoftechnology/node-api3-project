const express = require('express');

const router = express.Router();

const db = require('./userDb')

const postDB = require('../posts/postDb')

router.post('/',validateUser,  (req, res) => {
  db.insert(req.body)
  .then(hubs => {
    res.status(200).json(hubs)
    console.log(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user was not added"})
  })
});

router.post('/:id/posts',validatePost, validateUserId, (req, res) => {
  postDB.update(req.params.id, req.body)
  .then(hubs => {
    res.status(200).json(hubs)
    console.log(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The post was not updated"})
  })
});

router.get('/', (req, res) => {
  db.get()
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be returned"})
  })
});

router.get('/:id',validateUserId, (req, res) => {
  db.getById(req.params.id)
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be returned"})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  postDB.getById(req.params.id)
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be returned"})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  db.remove(req.params.id)
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be removed"})
  })
});

router.put('/:id',validateUserId, (req, res) => {
  db.update(req.params.id ,req.body)
  .then(hubs => {
    res.status(200).json(hubs)
    console.log(hubs)
  })
  .catch(error => {
    res.status(500).json({ error: "The user was not updated"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
db.getById(req.params.id)
        .then(post => {
           if(!post) {
            res.status(404).json({message: "invalid user id"  });
           } else {
             next();
           }
        })
}

function validateUser(req, res, next) {
  if(!req.body || req.body.length<1){
    res.status(400).json({message: "missing user data"})
  } else if(!req.body.name || req.body.name.length<1) {
    res.status(400).json({message: "missing required name field"})
  } else{
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body || req.body.length<1){
    res.status(400).json({message: "missing post data"})
  } else if(!req.body.text || req.body.text.length<1) {
    res.status(400).json({message: "missing required text field"})
  } else{
    next();
  }
}

module.exports = router;
