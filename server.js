const express = require("express");
const cors = require("cors");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger);

server.use("/users", userRouter);
server.use("/posts", postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(
    `${new Date().toISOString()} ${req.ip} ${req.method} ${req.url} `
  );

  next();
}

module.exports = server;
