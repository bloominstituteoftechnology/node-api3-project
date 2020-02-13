const express = require("express");

const server = express();

const postRouter = require("./posts/postRouter");

const userRouter = require("./users/userRouter")

server.use(express.json());

server.get("/", logger,  (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/user", logger, userRouter)

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} at ${Date.now()}`);

  next();
}






module.exports = server;
