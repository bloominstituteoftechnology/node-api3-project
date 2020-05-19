const Users = require('../users/userDb')
const Posts = require('../posts/postDb')

const logger = (req, res, next) => {
	const method = req.method
	const endpoint = req.originalUrl
	const date = new Date()
	console.log(`You made a ${method} request to ${endpoint} on ${date}`)
	next()
}

const validUserId = (req, res, next) => {
	const { id } = req.params
	Users.getById(id).then(user => {
		user ? req.user : res.status(400).json({ message: 'Invalid User ID!' })
		next()
	})
}

const validPostId = (req, res, next) => {
	const { id } = req.params
	Posts.getById(id).then(post => {
		post ? req.post : res.status(400).json({ message: 'Invalid Post ID!' })
		next()
	})
}

const validUser = (req, res, next) => {
	const { name } = req.body
	Object.entries(req.body).length === 0
		? res.status(400).json({ message: 'No User Data' })
		: !name
		? res.status(400).json({ message: 'Missing required name field' })
		: next()
}

const validPost = (req, res, next) => {
	const { text } = req.body
	Object.entries(req.body).length === 0
		? res.status(400).json({ message: 'No User Data' })
		: !text
		? res.status(400).json({ message: 'Missing required text field' })
		: next()
}


module.exports = { 
            logger, 
			validUserId, 
			validUser,
	        validPostId,
	        validPost,
        }