const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const usersRouter = require('./users/users-router');


const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/users', usersRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

