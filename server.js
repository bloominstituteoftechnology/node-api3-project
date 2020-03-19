const express = require('express');
const userRouter = require('./users/userRouter');

const server = express();

// Implemented Middleware
server.use(express.json());
server.use(logger);
server.use('api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Middleware Functions

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  console.log(`Endpoint URL: ${req.url}`);
  console.log(`Timestamp: ${new Date().toLocaleTimeString()}`);
  next();
};

module.exports = server;
