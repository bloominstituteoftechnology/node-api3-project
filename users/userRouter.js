const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  users
		.insert(req.body)
		.then(newUser => {
			res.status(201).json(newUser);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not create user' });
		});

});

router.post('/:id/posts', (req, res) => {
  const newPost = {
		user_id: req.params.id,
    text: req.body.text
  };

	posts
		.insert(newPost)
		.then(change => {
			res.status(201).json({ change });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not update user post' });
		});
});

router.get('/', (req, res) => {
  users
  .get()
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Could not get user' });
  });

});

router.get('/:id', (req, res) => {
  users
		.getById(req.params.id)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Could not find user' });
		});

});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;

	users
		.getUserPosts(id)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Cannot get posts' });
		});
});

router.delete('/:id', (req, res) => {
  users
		.remove(req.params.id)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Cannot delete user' });
		});
});

router.put('/:id', (req, res) => {
  const { id } = req.params;

	users
		.update(id, req.body)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.status(500).json({ message: 'Cannot edit user' });
		});

});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

	users.getById(id).then(user => {
		if (!user) {
			res.status(400).json({ message: 'No user found' });
		} else {
			next();
		}
	});
}

function validateUser(req, res, next) {
  const body = req.body;

	switch (true) {
		case !body:
			return res.status(400).json({ message: 'No user data' });
		case !body.name:
			return res.status(400).json({ message: 'No user name' });
		default:
			return next();
	}

}

function validatePost(req, res, next) {
  const body = req.body;

	switch (true) {
		case !body:
			return res.status(400).json({ message: 'No post data' });
		case !body.text:
			return res.status(400).json({ message: 'No post text' });
		default:
			return next();
	}
}

module.exports = router;
