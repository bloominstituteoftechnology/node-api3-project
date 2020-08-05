const express = require("express");
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/", userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.name} made a ${req.method} to ${req.url} at ${Date.now()}`
  );
  next();
}

module.exports = server;
