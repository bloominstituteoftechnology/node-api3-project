const express = require('express');
const  Users = require('./userDb');
const Post = require('../posts/postDb')
const router = express.Router();

const mw = require('../build/middleware')
const validUserId = mw.validUserId
const validUser = mw.validUser
const validPost = mw.validPost


router.post('/',validUser, (req, res) => {
  // do your magic!
	Users.insert(req.body)
		.then(user => {
			res.status(201).json({ success: 'A New User has been created!', user })
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
})


router.get('/', (req, res) => {
  // do your magic!
  Users.get()
       .then( user => {
          res.status(200).json(user)
       })
       .catch( err => {
         res.status(500).json({ err: 'No User info '})
       })
});

router.get('/:id',validUserId,(req, res) => {
  // do your magic!
  const { id } = req.params
	Users.getById(id)
		.then(user => {
			res.status(200).json(user)
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
});


router.delete('/:id', validUserId, (req, res) => {
  // do your magic!
	const { id } = req.params
	Users.getById(id)
		.then(user => {
			user
				? Users.remove(id).then(deleted => {
						deleted ? res.status(200).json({ success: `User ${id} was deleted!`, info: user }) : null
				})
				: null
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
})

router.put('/:id', validUserId, (req, res) => {
  // do your magic!
	const { id } = req.params

  Users.update(id, req.body)
    
		.then(user => {
			res.status(200).json({ success: 'Info Updated!', info: req.body })
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
})

router.post('/:id/posts',validUserId, validPost, (req, res) => {
  // do your magic!
  const { text } = req.body
	const user_id = req.params.id

	Users.getById(user_id)
		.then(post => {
			if (!post) {
				null
			} else {
				let newPost = {
					text,
					user_id, 
				}

				Posts.insert(newPost).then(post => {
					res.status(201).json({ success: post })
				})
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
});

router.get('/:id/posts', validUserId,(req, res) => {
  // do your magic!
  const { id } = req.params

	Users.getUserPosts(id)
		.then(data => {
			data ? res.status(200).json(data) : null
		})
		.catch(err => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
});


module.exports = router;
