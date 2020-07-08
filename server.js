const express = require('express');

const userRouter = require('./users/userRouter')

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json())
server.use(logger) // could use morgan for this instead? 
server.use("/api/users", userRouter)



function logger(req, res, next) {

  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );

  next();
}


module.exports = server;
