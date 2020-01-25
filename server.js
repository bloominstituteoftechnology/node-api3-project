const express = require('express');
const server = express();
const userRouter = require('./users/userRouter.js');
// const postRouter = require('./posts/postRouter.js');
const globalMiddleware = require('./globalMiddleware.js');

// middleware
server.use(express.json());
server.use(globalMiddleware.logger);

server.use('/api/users', userRouter);
// server.use('/api/users/:id/posts', postRouter);

server.use('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
