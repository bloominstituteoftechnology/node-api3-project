const express = require('express');
const userRouter = require('./users/userRouter.js');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const middleware = [ express.json(), cors(), helmet(), logger ];
server.use(middleware);

server.get('/api/users', userRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
// logger custom middleware logs the req.method, req.url and timestamp of each api call to the console
function logger(req, res, next) {
	console.log(`${req.method} Request from ${req.url} ${new Date().toISOString()}`);
	next();
}

module.exports = server;
