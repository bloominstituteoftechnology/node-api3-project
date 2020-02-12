const express = require('express'); //  importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const postRouter = require('./posts/postRouter');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} `);
  next();
}

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//global middleware
server.use(express.json()); //  built-in MW
//custom middleware
server.use(helmet());


function logger(req, res, next) {}

module.exports = server;
