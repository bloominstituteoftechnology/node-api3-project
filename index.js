// code away!
const express = require("express")
const userRouter = require("./users/userRouter")
const logger = require("./middleware/logger")

const server = express()
const port = 4000

server.use(express.json())
server.use(logger("long"))

server.use(userRouter)

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "Something went wrong, please try again later",
  })
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})