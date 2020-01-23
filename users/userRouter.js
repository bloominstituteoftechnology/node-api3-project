const express = require('express');
const user = require('./userDb.js');

const router = express.Router();

const middleware = require('./middleware.js');

router.post('/', (req, res) => {
	// do your magic!
});

router.post('/:id/posts', (req, res) => {
	// do your magic!
});

router.get('/', (req, res) => {
	user
		.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json({ message: 'error getting users' });
		});
});

router.get('/:id', middleware.validateUserId, (req, res) => {
	res.status(200).json(req.user);
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
}

function validateUser(req, res, next) {
	// do your magic!
}

function validatePost(req, res, next) {
	// do your magic!
}

module.exports = router;
