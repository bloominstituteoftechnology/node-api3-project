const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
	db.insert(req.body)
		.then(newUser => {
			res.status(200).json(newUser);
		})
		.catch(err => {
			res.status(500).json({
				err,
				errorMessage: "Can't make new user."
			});
		});
});

router.post('/:id/posts', validatePost, (req, res) => {
	db.insert(req.body)
		.then(newPost => {
			res.status(200).json(newPost);
		})
		.catch(err => {
			res.status(500).json({
				err,
				errorMessage: "Can't make new post."
			});
		});
});

// id routes

router.get('/', (req, res) => {
	db.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json({
				err,
				errorMessage: "Can't retrieve users."
			});
		});
});

router.get('/:id', validateUserId, (req, res) => {
	db.getById(req.params.id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			res.status(404).json({
				err,
				errorMessage: "Can't retrieve user."
			});
		});
});

router.get('/:id/posts', validateUserId, (req, res) => {
	db.getUserPosts(req.params.id) 
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({
				err,
				errorMessage: "Can't retrieve users posts."
			});
		});
});

router.delete('/:id', validateUserId, (req, res) => {
	db.remove(req.params.id)
		.then(count => {
			count === 1
				? res.status(200).json({
					message: `${count} user was removed from database.`
				})
				: res.status(500).json({
					err,
					errorMessage: "Can't remove user."
				});
		})
		.catch(err => {
			res.status(500).json({
				err,
				errorMessage: "Can't remove user."
			});
		})
});

router.put('/:id', validateUser, (req, res) => {
	db.update(req.params.id, req.body)
		.then(count => {
			count === 1
				? res.status(200).json({
					message: `${count} user was updated in database.`
				})
				: res.status(500).json({
					err,
					errorMessage: "Can't update user."
				});
		})
		.catch(err => {
			res.status(500).json({
				err,
				errorMessage: "Can't update user."
			});
		})
		
});

//custom middleware

function validateUserId(req, res, next) {
	db.getById(req.params.id)
		.then(user => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(400).json({
					message: "Invalid user id." 
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				err,
				message: "Error connecting to database."
			});
		});
};

function validateUser(req, res, next) {
	if(Object.keys(req.body).length !== 0) {
		req.body.name 
			? next()
		: res.status(400).json({
				message: "missing required name field"
			});
	} else {
		res.status(400).json({
			errorMessage: "missing user data"
		});
	}
}

function validatePost(req, res, next) {
	if(Object.keys(req.body).length !== 0) {
		req.body.text 
			? next ()
			: res.status(400).json({
				errorMessage: "missing required text field."
			})
	} else {
		res.status(400).json({
			errorMessage: "missing post data"
		});
	}
}

module.exports = router; 