//imports
const express = require('express');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter');
//server
const server = express();

server.use(express.json());
server.use('/api/users', logger, userRouter);
server.use('/api/posts', logger, postRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	console.log(
		`[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl}`
	);
	next();
}

module.exports = server;
