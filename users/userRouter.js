const express = require('express');

//db
const Users = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
	console.log(req.body);
	Users.insert(req.body)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

//not done
router.post('/:id/posts', (req, res) => {
	const { id } = req.params;
	console.log(id);
	Users.insert(req.body)
		.then(user => {
			User.getById(id);
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

router.get('/', (req, res) => {
	console.log(req.body);
	Users.get().then(user => {
		res.status(200).json(user);
	});
});

router.get('/:id', validateUserId, (req, res) => {
	const id = req.params.id;

	Users.getById(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

router.get('/:id/posts', validateUserId, (req, res) => {
	const { id } = req.params;
	Users.getUserPosts(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error adding the hub'
			});
		});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Users.remove(id)
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

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	Users.update(id, changes)
		.then(user => {
			console.log('changes', changes);
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

function validateUserId(req, res, next) {
	const id = req.params.id;
	console.log('idd', id);

	Users.getById(id).then(user => {
		if (user) {
			console.log(req.body);
			console.log('user', user);
			next();
		} else {
			res.status(400).json({ message: 'invalid user id' });
			next();
		}
	});
}

function validateUser(req, res, next) {
	// do your magic!
}

function validatePost(req, res, next) {
	// do your magic!
}

module.exports = router;
