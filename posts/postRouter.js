const express = require('express');

//db
const Posts = require('./postDb');
const Users = require('./../users/userDb');

const router = express.Router();

//RETURNS ALL POSTS ✔
router.get('/', (req, res) => {
	console.log('yo');
	Posts.get()
		.then(post => {
			res.status(200).json(post);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

//ID OF POST
router.get('/:id', validatePostId, (req, res) => {
	const { id } = req.params;
	Posts.getById(id)
		.then(post => {
			console.log('post in get', post);
			res.status(200).json(post);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

router.delete('/:id', validatePostId, (req, res) => {
	const { id } = req.params;
	Posts.remove(id)
		.then(deleted => {
			res.status(200).json(deleted);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

router.put('/:id', validatePostId, (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	Posts.update(id, changes)
		.then(updated => {
			res.status(200).json(updated);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

// custom middleware

function validatePostId(req, res, next) {
	const id = req.params;
	console.log('postid', id);
	Users.getById(id);

	Users.getUserPosts(id).then(post => {
		console.log('post on middleware', post);
		if (post.length === 0) {
			res.status(400).json({ message: 'invalid user id' });
		} else {
			next();
		}
	});
}

module.exports = router;

/* - `validateUserId` validates the user id on every request that expects a user id parameter
- if the `id` parameter is valid, store that user object as `req.user`
- if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }` */
