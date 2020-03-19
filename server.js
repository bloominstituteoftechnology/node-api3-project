const express = require("express");


const userRouter = require('./users/userRouter');
const server = express();
server.use(express.json());

server.use('/api/users', userRouter);
server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(logger);

//custom middleware

function logger(req, res, next) {
  console.log(req.url);
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get(
      "Origin"
    )}`
  );
  next();
}

module.exports = server;
