//imports
const express = require('express');
const userData = require('./userDb');

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
	// do your magic!
});

userRouter.post('/:id/posts', (req, res) => {
	// do your magic!
});

userRouter.get('/', (req, res) => {
	// do your magic!
});

userRouter.get('/:id', (req, res) => {
	// do your magic!
});

userRouter.get('/:id/posts', (req, res) => {
	// do your magic!
});

userRouter.delete('/:id', (req, res) => {
	// do your magic!
});

userRouter.put('/:id', (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
}

function validateUser(req, res, next) {
	// do your magic!
}

function validatePost(req, res, next) {
	// do your magic!
}

module.exports = router;
