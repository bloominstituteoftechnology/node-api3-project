const express = require('express');

// adds/edit secure default headers.
const helmet = require('helmet');
// const morgan = require('morgan');
const middleware = require('./middleware')
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json());
// server.use(morgan('dev'))
server.use(helmet());
server.use(middleware.logger)
server.use('/post', postRouter)
server.use('/user', userRouter)


module.exports = server;
