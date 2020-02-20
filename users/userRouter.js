//imports
const express = require('express');
const userData = require('./userDb');
const userRouter = express.Router();

userRouter.post('/', validateUser(), async (req, res, next) => {
	try {
		const data = await usersData.insert(req.body);
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

userRouter.post('/:id/posts', validatePost(), validateUserId(), async (req, res) => {
	try {
		const newPost = await postData.insert(req.text);
		res.status(201).json(newPost);
	} catch (err) {
		next(err);
	}
});

userRouter.get('/', async (req, res, next) => {
	try {
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
});

userRouter.get('/:id', validateUserId(), async (req, res, next) => {
	try {
		res.status(200).json(data);
	} catch (err) {
		next(err);
	}
});

userRouter.get('/:id/posts', validateUser(), validatePost(), async (req, res, next) => {
	try {
		const userPosts = await userData.getUserPosts(req.params.id);
		res.status(200).json(userPosts);
	} catch (err) {
		next(err);
	}
});

userRouter.delete('/:id', validateUserId(), async (req, res, next) => {
	try {
		const userDelete = await userData.remove(req.params.id);
		res.status(204).json({ message: 'The user is delete' });
	} catch (err) {
		next(err);
	}
});

userRouter.put('/:id', validateUserId(), validateUser(), async (req, res, next) => {
	try {
		const updateUser = await userData.update(req.params.id, req.body);
		res.status(200).json({ message: 'Your data is updated' });
	} catch (err) {
		next(err);
	}
});

//custom middleware

function validateUserId(req, res, next) {
	const user = users.getById(req.params.id);
	if (user) {
		req.user = user;
		next();
	}
	else {
		res.status(400).json({ message: 'ID Does not exist' });
	}
}

function validateUser(req, res, next) {
	const name = req.body.name;
	if (!name) {
		return res.status(404).json({ message: 'Missing user Data' });
	}
	else {
		req.user = resource;
		next();
	}
}

function validatePost(req, res, next) {
	if (!req.body || Object.keys(req.body).length === 0) {
		res.status(400).json({ message: 'missing post data' });
	}
	else if (!req.body.text) {
		res.status(400).json({ message: 'missing required text field' });
	}
	else {
		next();
	}
}

module.exports = router;
