const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', validateIdParameter, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateIdParameter, (req, res) => {
  // do your magic!
});

router.put('/:id', validateIdParameter, (req, res) => {
  // do your magic!
});

// custom middleware

function validateIdParameter(req, res, next) {
  // checkt that id is numbah
  // check that it corresponds ot actual existing post in the ebd
  // next()
}

module.exports = router;
