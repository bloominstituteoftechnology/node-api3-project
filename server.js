require('dotenv').config();
const express = require('express');
const helmet = require('helmet')
const usersRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter')

const server = express();

server.use(helmet())
server.use(logger);
server.use(express.json());
server.use('/api/users', usersRouter);
server.use('/api/posts', postRouter);

server.use((err, req, res, next) => {
	// log the error and send back generic message so we don't expose
	// any potentailly-sensitive information contained in the error message
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong, please try again later",
	})
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// LOGGER MIDDLEWARE
function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;
  let date = new Date();

  console.log(`${method} to ${endpoint} at ${date}`);
  next();
}



module.exports = server;