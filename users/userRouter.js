const express = require('express');
const users = require("./userDb");
// const { validateUserId } = require('./userMiddleware');

const router = express.Router();

// router.post('/', (req, res) => {
//   // do your magic!
// });

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

// router.get('/:id/posts', (req, res) => {
//   // do your magic!
// });

// router.delete('/:id', (req, res) => {
//   // do your magic!
// });

router.put('/:id', (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
     Message: "Name is missing"
   })
  }
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


// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
