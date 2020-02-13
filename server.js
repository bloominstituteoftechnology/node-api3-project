//  importing a CommonJS module
const express = require("express");
const helmet = require("helmet");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const morgan = require("morgan");

const server = express();

//global middleware
server.use(express.json()); //  built-in MW
server.use(logger);
server.use("./api/user", userRouter);
server.use("./api/post", postRouter);

//  importing 3rd party MW

server.use(helmet());
server.use(morgan);

module.exports = server;

//  custom middleware

function logger(req, res, next) {
  console.log(
    `${req.method} Request to ${
      req.originalUrl
    } at ${new Date().toISOString()} `
  );
  next();
}
