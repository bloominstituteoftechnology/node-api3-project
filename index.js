// code away!
const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")
const postsRouter = require("./posts/postRouter")
const usersRouter = require("./users/userRouter")

const server = express()
const port = process.env.PORT || 2415

server.use(express.json())
server.use(cors())
server.use(logger({format: "long"}))
server.use("/posts", postsRouter)
server.use("/users", usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})