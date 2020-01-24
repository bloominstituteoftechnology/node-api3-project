const express = require('express');
const user = require('./userDb.js');

const router = express.Router();

const middleware = require('./middleware.js');

router.post('/', middleware.validateUser, (req, res) => {
	const body = req.body;

	user
		.insert(body)
		.then((body) => {
			res.status(201).json(body);
		})
		.catch((err) => {
			res.status(500).json({ error: 'error adding user' });
		});
});

router.post('/:id/posts', middleware.validatePost, (req, res) => {
	// do your magic!
	const body = req.body;

	user
		.insert(body)
		.then((body) => {
			res.status(201).json(body);
		})
		.catch((err) => {
			res.status(500).json({ error: 'error adding post' });
		});
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
// todo add post id middleware
router.get('/:id/posts', (req, res) => {
	// do your magic!
	user
		.getUserPosts()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((err) => {
			res.status(500).json({ message: 'error getting users' });
		});
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

module.exports = router;
