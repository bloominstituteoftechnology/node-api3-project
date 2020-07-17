const express = require('express');
const Users = require('../users/userDb');

const router = express.Router();

router.use(validateUser);
router.use(validateUserId);
router.use(validatePost);

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
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

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;


}

function validateUser(req, res, next) {
  // do your magic!
  req.user = req.user || 'sk';
  next()
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
