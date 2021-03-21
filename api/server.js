const express = require('express');

const userRouter = require('./users/users-router.js');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();
const middleware = require('../api/middleware/middleware.js');


// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));
server.use(middleware.logger);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
