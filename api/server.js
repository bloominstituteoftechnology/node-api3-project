const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { logger } = require('./middleware/middleware');

const server = express();

const usersRouter = require('./users/users-router');

server.use(express.json());
server.use(morgan('tiny'));
server.use(cors());
server.use(helmet());

server.use('/api/users', logger, usersRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res, next) => {
  next(res.status(404).json({ message: `user not found` }))
});


module.exports = server;

