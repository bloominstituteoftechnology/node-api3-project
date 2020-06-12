const express = require("express");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
server.use(express.json());

server.use(userRouter);
server.use(postRouter);
server.use(logger);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something Went Wrong",
  });
});
//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

module.exports = server;
