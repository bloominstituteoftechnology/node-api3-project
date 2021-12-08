const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
const userRouter = require('./users/users-router')
const {logger} = require('./middleware/middleware')

const server = express();

// remember express by default cannot parse JSON in request bodies
// global middlewares and the user's router need to be connected here

server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())
server.use('/api/users', logger, userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
