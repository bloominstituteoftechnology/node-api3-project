const express = require('express');

const { validateUserId } = require('./user-middleware')
const router = express.Router();

const user = require('./userDb')

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res, next) => {
  user.get()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err)=> {
      next(err)
    })
});

router.get('/:id', validateUserId(), (req, res, next) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});



module.exports = router;
