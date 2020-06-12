const express = require("express")
const server = require("./server")
const port = process.env.port || 4000
const postRouter = require("./posts/postRouter")
const logger = require("./middleware/logger")
// const validatePosts = require("./middleware/validatePost")
// const validateUser= require("./middleware/validateUser")
// const validateUserId = require("./middleware/validateUserId")

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
