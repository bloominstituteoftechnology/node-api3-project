const express = require('express');

const server = express();

// Implemented Middleware
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Middleware Functions

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  console.log(`Endpoint URL: ${req.url}`)
  next();
};

module.exports = server;
