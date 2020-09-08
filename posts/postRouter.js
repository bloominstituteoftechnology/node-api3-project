const express = require('express');
const posts = require('../posts/postDb');
const validatePostId = require('../middleware/postMiddleware');
const { validatePost } = require('../middleware/userMiddleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const allPosts = await posts.get();
		res.status(200).json(allPosts);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validatePostId(), (req, res) => {
	res.status(200).json(req.post);
});

router.delete('/:id', validatePostId(), async (req, res, next) => {
	try {
		await posts.remove(req.post.id);
		res.status(200).json(req.post);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', validatePost(), validatePostId(), async (req, res, next) => {
	try {
		await posts.update(req.post.id, req.body);
		const updated = await posts.getById(req.post.id);
		res.status(200).json(updated);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
