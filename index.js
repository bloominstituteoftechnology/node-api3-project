const express = require("express")
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")
const logger = require("./middleware/logger")
const validatePosts = require("./middleware/validatePost")
const validateUser= require("./middleware/validateUser")
const validateUserId = require("./middleware/validateUserId")

server.use(express.json())
server.use(logger)
server.use(validatePosts)
server.use(validateUser)
server.use(validateUserId)

server.use =((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message:"something went wrong"
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
