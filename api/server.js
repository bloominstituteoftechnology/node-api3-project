const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const mw = require('./middleware/middleware')
const usersRouter = require('./users/users-router')

const server = express();


server.use(helmet())
server.use(morgan("dev"))
server.use(express.json())
server.use(mw.logger)

server.use('/api/users', usersRouter)


server

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
