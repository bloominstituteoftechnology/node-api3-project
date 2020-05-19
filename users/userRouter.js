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

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

//custom middleware 

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
