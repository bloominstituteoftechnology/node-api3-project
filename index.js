const express = require("express")

const welcomeRouter = require("./welcome/welcome-router.js")

const server = express()
const port = 4000

server.use(express.json())

server.use("/", welcomeRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})