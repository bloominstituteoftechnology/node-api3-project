const express = require('express');
const { logger } = require("./middleware/middleware")
const usersRouter = require("./users/users-router")

const server = express();

server.use(logger("long"))
server.use(express.json())
server.use(usersRouter)

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
  });

//error middleware
server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong",
	})
})



module.exports = server;
