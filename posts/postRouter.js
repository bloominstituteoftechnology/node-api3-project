// Express
const express = require('express');
const router = express.Router();

// Database for posts
const postsDB = require('../posts/postDb');

//Custom Middleware
const cm = require('../middleware/middleware');

// validate post with custom middleware
// const validatePost = cm.validatePost
const validatePostid = cm.validatePostId;

// ### GET list of all POSTS in an array ###
router.get('/', (req, res) => {
	// do your magic!
	postsDB
		.get()
		.then((posts) => res.status(200).json(posts))
		.catch((err) => {
			res.status(500).json({ errorMessage: 'Could not get posts.' });
		});
});

// ### GET POST by the specific id ###
router.get('/:id', validatePostid, (req, res) => {
	// do your magic!
	res.status(200).json(req.post);
});

// ### DELETE POST by the specific id ###
router.delete('/:id', validatePostid, (req, res) => {
	// do your magic!
	const id = req.params.id;

	postsDB
		.remove(id)
		.then(() => res.status(200).json())
		.catch((err) => {
			res.status(500).json({ errorMessage: 'Could not delete post.' });
		});
});

// ### UPDATE POST by the specificid of post ###

router.put('/:id', validatePostid, (req, res) => {
	// do your magic!
	const id = req.post.id;

	postsDB
		.update(id, { text: req.body.text })
		.then(() => {
			res.status(200).json({ ...req.post, text: req.body.text });
		})
		.catch((err) => {
			res.status(500).json({ message: 'Post could not be updated.' });
		});
});

module.exports = router;
