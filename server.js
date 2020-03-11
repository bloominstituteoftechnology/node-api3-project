const express = require('express');

const server = express();

//apply middleware(both express.json & logger)
server.use(express.json())
server.use(logger)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware(logger middleware to log our console)

function logger(req, res, next) {
const method = req.method
const endpoint = req.originalurl 
const date = Date.now()
console.log(`${date} ${method} to ${endpoint}`)
next()  //next() is to jump to next middleware and prevent timeouts
}

module.exports = server;
