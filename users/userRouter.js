const express = require('express');
const { checkUserID, checkUserData } = require("../middleware/user")
const users = require("./userDb")

const router = express.Router();

router.post('/', checkUserData(), (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.get("/welcome", (req, res) => {
  res.status(200).json({
    message: `Welcome ${process.env.COHORT}!`
  })
})

router.post('/:id/posts', checkUserID(), (req, res) => {
  // do your magic!
  if (!req.body.text) {
    return res.status(400).json({
      message: "Need a value for text",
    })
  }

  users.addUserPost(req.params.id, req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      console.log(error)
    })
});

router.get('/', (req, res) => {
  // do your magic!
  const options = {
    sortyBy: req.query.sortyBy,
    limit: req.query.limit,
  }

  users.find(options)
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/:id', checkUserID(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', checkUserID(), (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', checkUserID(), (req, res) => {
  // do your magic!
  users.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({
        message: "User has been deleted",
      })
    } else {
      res.status(404).json({
        message: "The user could not be found",
      })
    }
  })
  .catch((err) => {
    console.log(err)
  })
});

router.put('/:id', checkUserData(), checkUserID(), (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user could not be found",
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
});

//custom middleware

// check ../middleware/user.js

module.exports = router;
