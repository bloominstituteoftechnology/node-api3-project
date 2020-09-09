const express = require('express');
const posts = require('../posts/postDb');
const users = require('../users/userDb');
const validatePostId = require('../middleware/postMiddleware');
const { validatePost } = require('../middleware/userMiddleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		let allPosts = await posts.get();
		let namePosts = await Promise.all(
			allPosts.map(async (post) => {
				let user = await users.getById(post.user_id);
				post.user_name = user.name;
				console.log(post);
				return post;
			})
		);
		res.status(200).json(namePosts);
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
