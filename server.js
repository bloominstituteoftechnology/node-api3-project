const express = require("express");

const userDb = require("./users/userDb");
const postDb = require("./posts/postDb");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();

server.use(express.json());

server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(`[${today}]${req.method} to ${req.url}`);
  next();
}

module.exports = server;
