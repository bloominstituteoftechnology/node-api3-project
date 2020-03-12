const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(logger);

// Routers
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
	const url = req.originalUrl;
	const timeStamp = Date.now();

	console.log(`\nMethod: ${method} \nUrl: ${url} \nTime: ${timeStamp}`);

	next();
}

module.exports = server;
