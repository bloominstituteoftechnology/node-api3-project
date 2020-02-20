//imports
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

//Router Imports
const welcomeRouter = require('./welcome/welcomeRouter');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

//defining server and routes here.
const server = express();

//call stack
server.use(logger());
server.use(helmet());
server.use(express.json());

//Routes go here.
server.use('/', welcomeRouter);

//error middle ware for all routes.
server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		message: 'Something went wrong, please check your inputs and make sure you are sending the right '
	});
});

//server port

//custom middleware

function logger(format) {
	return (req, res, next) => {
		const { ip, method, url } = req;
		const agent = req.get('User-Agent');

		if (format === 'short') {
			console.log(`${method} ${url}`);
		}
		else {
			console.log(`${ip} ${method} ${url} ${agent}`);
		}
		next();
	};
}

module.exports = server;
