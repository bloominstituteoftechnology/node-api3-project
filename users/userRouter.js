const express = require('express');
const user = require('./userDb.js');
const post = require('../posts/postDb.js');

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

router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, (req, res) => {
	const postInfo = { ...req.body, user_id: req.params.id };

	// * to bring in the helper fuctions from the post folder
	post
		.insert(postInfo)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((err) => {
			res.status(500).json({ error: 'unable to create post', err });
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

router.get('/:id/posts', (req, res) => {
	const { id } = req.params;

	user
		.getUserPosts(id)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts);
			} else {
				res.status(400).json({ error: 'invalid user id' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: 'there was a problem getting the posts' });
		});
});

router.delete('/:id', middleware.validateUserId, (req, res) => {
	user
		.remove(req.user.id)
		.then((removed) => {
			res.status(200).json({ message: `users removed ${removed}` });
		})
		.catch((err) => {
			res.status(500).json({ error: 'could not removed user', err });
		});
});

router.put('/:id', middleware.validateUserId, middleware.validateUser, (req, res) => {
	const changes = req.body;
	const { id } = req.user;

	user.update(id, changes).then((records) => {
		res.status(200).json({ message: `records updated ${records}` });
	});
});

module.exports = router;
