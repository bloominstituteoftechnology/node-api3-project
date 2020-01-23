const express = require('express');
const server = express();
const userRouter = require('./users/userRouter.js');

// middleware
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
// logger custom middleware logs the req.method, req.url and timestamp of each api call to the console
function logger(req, res, next) {
	console.log(`${req.method} Request from ${req.url} ${new Date().toISOString()}`);
	next();
}

module.exports = server;
