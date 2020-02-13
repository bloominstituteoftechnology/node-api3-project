const express = require("express");
const router = express.Router();
const Db = require("./userDb");
const posts = require('../posts/postDb');



router.post("/", (req, res) => {
  const { userName } = req.body;
  Db.insert({ name: userName })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not add user"})
    })
});

router.get("/", (req, res) => {
  Db.get()
  .then(user => {
    res.status(200).json(user)    
  })
  .catch(err => {
    res.status(500).json({ message: 'Could not retrieve data from database'})
  })
});

router.get("/:id", validateUserId, (req, res) => {
  Db.getUserPosts(req.user.id)
  .then(posts => {
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(400).json({ message: 'This user has no posts' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Could not retrieve posts' });
  })
});

router.delete("/:id", validateUserId, (req, res) => {
  Db.remove(req.user.id)
  .then(() => {
    res.status(200).json({ message: `User with id ${req.user.id} was removed` })
  })
  .catch(err => {
    res.status(500).json({ message: 'Unable to delete selected user.'})
  })
});

router.put("/:id", (req, res) => {
  Db.update(req.user.id, { name: req.body.name })
  .then(() => {
    Db.getById(req.user.id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: 'Could not get updated user.' });
      });
  })
  .catch(err => {
    res.status(500).json({ message: 'Could not update user.' });
  });
});

//custom middleware
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  posts.insert({ user_id: req.params.id, text: req.body.text })
  .then(post => {
    res.status(200).json({ message: post })
  })
  .catch(error => {
    res.status(500).json({ message: "Could not post" })
  })
});

function validateUserId(req, res, next) {
  Db.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(500).json({ message: 'No user exists with that ID' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Need to provide valid ID"})
    })
}

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ message: 'Missing Name' })
    }
  } else {
      res.status(400).json({ message: 'Missing User Data' })
  }
}


function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ message: 'Missing text field' })
    }
  } else {
      res.status(400).json({ message: 'Missing post data' })
  }
}

module.exports = router;
