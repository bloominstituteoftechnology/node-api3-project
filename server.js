const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/users", userRouter);
server.use("/posts", postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.name} made a ${req.method} to ${req.url} at ${Date.now()}`
  );
  next();
}

module.exports = server;
