const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

// MIDDLEWARE
const cm = require('./middleware/middleware');

// LOGGER
const logger = cm.logger();

//USER POST API ROUTER
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

// PARSERS
server.use(helmet(), logger, express.json(), cors());

//API ROUTES
server.use('/posts', postRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's get at the Middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
