const express = require("express");
const userRouter = require("./users/userRouter.js");
// see morgan
const server = express();
const userMethdos = require("./users/userDb");
// const postMethods = require("./posts/postDb");
// const Joi = require("joi");

server.use(express.json());
server.use(logger);
server.use("/api/users/", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  // logs to the console req.method, request url, and a timestamp
  // runs on every request made to the API
  console.log(`Method: ${req.method}, URL: ${req.url}, Timestamp:${Date.now()}`);
  next();
}

module.exports = server;