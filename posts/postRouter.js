//imports
const express = require('express');
const postData = require('./postDb');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
	// do your magic!
});

postRouter.get('/:id', (req, res) => {
	// do your magic!
});

postRouter.delete('/:id', (req, res) => {
	// do your magic!
});

postRouter.put('/:id', (req, res) => {
	// do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
	// do your magic!
}

module.exports = router;
