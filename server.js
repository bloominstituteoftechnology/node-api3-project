const express = require('express');

const server = express();

// plug in the body parsing ability
server.use(express.json())

// connect it here, a m. that writes a more generic X-Powered-By
server.use(function (req, res, next) {
  res.header('X-Powered-By', 'Do not be nosy')
  res.header('Lambda-Header', 'Have fun')
  next()
})

server.get('/friend', (req, res) => {
  res.send(`<h2>Hello, friend!</h2>`);
})

server.get('/:id', (req, res) => {
  res.send(`<h2>That is a nice id: ${req.params.id}</h2>`);
})

//custom middleware

function logger(req, res, next) {}

module.exports = server;
