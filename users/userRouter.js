const express = require('express');

//db
const Users = require('./userDb.js');
const Posts = require('./../posts/postDb');

const router = express.Router();

//CREATE USER
//posting with name works - creates user ✔
//posting with no object -> NOPE
//posting with no name -> NOPE
router.post('/', validateUser, (req, res) => {
	console.log(req.body);
	console.log('userrouter');
	Users.insert(req.body)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error creating user'
			});
		});
});

//CREATE A POST
//creates post ✔
//if there's no text it throws error ✔
//if there's no body throws error NOPE
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	const user_id = req.params.id;
	const body = { ...req.body, user_id: user_id };
	console.log(user_id);
	console.log('body', body);
	Posts.insert(body)
		.then(user => {
			console.log('inside then');
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error creating post'
			});
		});
});

//all users ✔
router.get('/', (req, res) => {
	console.log(req.body);
	Users.get()
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error getting users'
			});
		});
});

//GETS THE USER
//Getting user object ✔
//Gets invalid user id through middleware ✔
router.get('/:id', validateUserId, (req, res) => {
	const id = req.params.id;

	Users.getById(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error getting the user'
			});
		});
});

//GETTING POSTS FROM A USER
//Getting user's posts ✔
//Gets invalid user id through middleware ✔
router.get('/:id/posts', validateUserId, (req, res) => {
	const { id } = req.params;
	Users.getUserPosts(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error getting posts from this user'
			});
		});
});

//DELETING USERS
//Deletes User ✔
//Invalid ID middleware ✔
router.delete('/:id', validateUserId, (req, res) => {
	const { id } = req.params;
	Users.remove(id)
		.then(user => {
			console.log('user', user);
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error deleting user'
			});
		});
});

//UPDATING USERS
//Updates user ✔
//Invalid ID middleware ✔
router.put('/:id', validateUserId, (req, res) => {
	const { id } = req.params;
	console.log('id', id);
	const changes = req.body;
	console.log('changes', changes);

	Users.update(id, changes)
		.then(user => {
			console.log('user', user);
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

//custom middleware
//WORKING ✔
function validateUserId(req, res, next) {
	const id = req.params.id;
	console.log('idd', id);

	Users.getById(id).then(user => {
		console.log('user');
		if (user) {
			console.log(req.body);
			console.log('user', user);
			next();
		} else {
			res.status(400).json({ message: 'invalid user id' });
		}
	});
}

function validateUser(req, res, next) {
	function isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	}

	console.log('validating', req.body);
	console.log('name', req.body.name);
	const body = { ...req.body };
	console.log('bodyyyy', body);

	if (isEmpty(req.body)) {
		res.status(400).json({ message: 'missing user data' });
	} else if (!req.body.name) {
		res.status(400).json({ message: 'missing required name field' });
		console.log('first');
	} else {
		next();
	}
}

function validatePost(req, res, next) {
	const user_id = req.params.id;
	const body = { ...req.body, user_id: user_id };
	console.log('user_id', user_id);
	console.log('body', body);
	if (body.text) {
		console.log('has text');
		next();
	} else {
		console.log('has no text');
		res.status(400).json({ message: 'missing required text field' });
	}
}

module.exports = router;
