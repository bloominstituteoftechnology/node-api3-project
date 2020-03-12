const express = require('express');
const server = express();
const userRouter = require('./users/userRouter');

//middleware stack
server.use(express.json());
server.use(logger);

//custom middleware
function logger(req, res, next) {
  console.log(`
   Logger: ${req.method} request to ${req.url} at ${new Date().toISOString()}
  `)
  next();
}

//routes/endpoints
server.use('api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;