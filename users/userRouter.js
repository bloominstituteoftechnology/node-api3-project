const express = require('express');
const {
	validateUser,
	validateUserId,
	validatePost,
} = require('../middleware/userMiddleware');
const users = require('./userDb');
const router = express.Router();
const posts = require('../posts/postDb');

router.post('/', validateUser(), async (req, res, next) => {
	try {
		const user = await users.insert(req.body);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

router.post(
	'/:id/posts',
	validatePost(),
	validateUserId(),
	async (req, res, next) => {
		try {
			const post = await posts.insert({
				text: req.body.text,
				user_id: req.user.id,
			});
			res.status(201).json(post);
		} catch (error) {
			next(error);
		}
	}
);

router.get('/', async (req, res, next) => {
	try {
		const allUsers = await users.get();
		res.status(200).json(allUsers);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validateUserId(), async (req, res, next) => {
	res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId(), async (req, res, next) => {
	try {
		const posts = await users.getUserPosts(req.user.id);
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', validateUserId(), async (req, res, next) => {
	try {
		await users.remove(req.user.id);
		res.status(200).json(req.user);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', validateUser(), validateUserId(), async (req, res, next) => {
	try {
		await users.update(req.user.id, req.body);
		const updated = await users.getById(req.user.id);
		res.status(200).json(updated);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
