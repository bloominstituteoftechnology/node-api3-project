const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
	posts
		.get()
		.then(posts => {
			res.status(201).json(posts);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not get posts' });
		});
});

router.get('/:id', validatePostId, (req, res) => {
	// do your magic!
	const { id } = req.params;
	posts
		.getById(id)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Error getting ID' });
		});
});

router.delete('/:id', validatePostId, (req, res) => {
	// do your magic!
	const { id } = req.params;
	posts
		.remove(id)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not delete post' });
		});
});

router.put('/:id', validatePostId, (req, res) => {
	// do your magic!
	const { id } = req.params;
	const response = req.body;
	posts
		.update(id, response)
		.then(response => {
			res.status(201).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not update post' });
		});
});

// custom middleware

function validatePostId(req, res, next) {
	// do your magic!
	const { id } = req.params;

	if (!id) {
		res.status(500).json({ message: 'Please make sure you have a post ID' });
	}

	next();
}

module.exports = router;
