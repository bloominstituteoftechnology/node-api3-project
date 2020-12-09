const express = require('express');
const users = require("./userDb");
// const { validateUserId } = require('./userMiddleware');

const router = express.Router();

router.post('/', validateUser(), (req, res, next) => {
  users.insert(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
  })
});

// router.post('/:id/posts', (req, res) => {
//   // do your magic!
// });

router.get('/', (req, res, next) => {
  users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      next(error);
  })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res, next) => {
  users.getUserPosts(req.params.id)
    .then((posts) => {
    res.status(200).json(posts)
    })
    .catch((error) => {
      next(error);
  })
});

router.delete('/:id', (req, res, next) => {
  users.remove(req.params.id)
    .then((user) => {
      if (user > 0) {
        res.status(200).json({
          Message: "User Name has been delete"
        })
      } else {
        res.status(404).json({
          Message: "User with specific ID does not exsist"
        })
      }
    })
    .catch((error) => {
      next(error);
  })
});

router.put('/:id', validateUser(), (req, res, next) => {
  users.update(req.params.id, req.body)
    .then((user) => {
      if (req.params.id, req.body) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          Message: "The user with specific ID is not found"
        })
      }
    })
    .catch((error) => {
      next(error);
  })
});

//custom middleware


function validateUserId() {
  return (req, res, next) => {
      users.getById(req.params.id)
          .then((user) => {
              if (user) {
                  req.user = user;
                  next();
              } else {
                  res.status(404).json({
                      Message: "Invalid User ID"
                  })
          }
          })
          .catch((error) => {
              next(error);
      })
  }
}


function validateUser() {
  return (req, res, next) => {
    if (!req.body.name) {
      res.status(400).json({
       Message: "Name is missing"
     })
    } else {
      next();
    }
  }
}

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
