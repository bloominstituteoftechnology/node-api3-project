const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/users", userRouter);
server.use("/posts", postRouter);
server.get("/", (req, res) => {
  message = process.env.MESSAGE;

  res.status(200).json({ message: message });
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.name} made a ${req.method} to ${req.url} at ${Date.now()}`
  );
  next();
}

module.exports = server;
