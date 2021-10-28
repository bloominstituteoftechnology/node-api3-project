const express = require('express');

const {
  handleError,
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const Posts = require ('../posts/posts-model');
const Users = require ('./users-model');
const router = express.Router();


// router.get("/", (req, res, next) => {
//   Users.get()
//     .then((users) => {
//       res.status(200).json(users);
//     })
//     .catch(next);
// });
// -------------------------------------------
// Notes for myself: I know that I should delete this comment but I like to keep both ways just for learning. The code below passed the test also.
// -------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.get();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "no users found" });
    }
  } catch (err) {
    next(err);
  }
});
// -------------------------------------------

router.get('/:id', validateUserId, (req, res, next) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(next);
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next)

  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',validatePost, (req, res, next) => {
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(next);
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use(handleError);
module.exports = router;
