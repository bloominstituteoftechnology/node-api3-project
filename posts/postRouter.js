const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  // do your magic!
});

router.get('/:id', (request, response) => {
  // do your magic!
});

router.delete('/:id', (request, response) => {
  // do your magic!
});

router.put('/:id', (request, response) => {
  // do your magic!
});

// custom middleware

function validatePostId(request, response, next) {
  // do your magic!
}

module.exports = router;
