const express = require('express');
const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(logger());
server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ message: 'Something went wrong, try again...' });
});

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
