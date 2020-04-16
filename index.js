// code away!
const express = require("express")
const cors = require("cors")
const logger = requre("./middlware/logger")
const postsRouter = require("./posts/postRouter")
const usersRouter = require("./users/userRouter")

const server = express()
const port = 2415

server.use(express.json())
server.use(cors())
server.use(logger({format: "long"}))
server.use("/posts", postsRouter)
server.use("/users", usersRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})