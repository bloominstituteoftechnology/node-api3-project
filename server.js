const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const { logger } = require('./middleweare/mwFunctions');

const server = express();

server.use(express.json());

server.use(cors());
server.use(morgan('dev'));
server.use(logger);

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  // res.send(`<h2>Let's write some middleware !</h2>
  // <p>The browser server is running fine</p>`);
  res.status(200).json({ message: process.env.MOTD });
});

module.exports = server;
