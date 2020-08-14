const express = require('express');
const users = require('./userDb');
const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  // do your magic!
  users
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  // do your magic!
  users
    .insertPost(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Could not create user post',
      });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  users
    .get()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users
    .getById(req.user)
    .then((user) => {
      res.status(201).json(req.user);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  users
    .getUserPosts(req.user)
    .then((user) => {
      res.status(201).json(req.user.posts);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: 'Deleted',
        });
      } else {
        res.status(404).json({
          message: 'The user could not be found',
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  // do your magic!
  users
    .update(req.user, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: 'The user could not be found',
        });
      }
    })
    .catch(next);
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({
            message: 'Invalid user ID',
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'Missing user data',
      });
    } else if (!req.body.name) {
      return res.status(400).json({
        message: 'Missing required name field',
      });
    }
    next();
  };
}

function validatePost() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'Missing post data',
      });
    } else if (!req.body.text) {
      return res.status(400).json({
        message: 'Missing required text field',
      });
    }
    next();
  };
}

module.exports = router;
