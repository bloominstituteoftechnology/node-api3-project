const express = require('express');

const logger = require('./users/middleware/logger');
const validateUserId = require('./users/middleware/validateUserId');
const validateUser = require('./users/middleware/validateUser');
const validatePost = require('./users/middleware/validatePost');

const userRouter = require('./users/userRouter');

const server = express();
server.use(express.json());

server.use('/api/users', logger, userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
