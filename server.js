const express = require("express");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const welcome = require("./welcome-router/welcome-router")
const logger = require("./data/logger/logger");


const server = express();
server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/posts",postRouter);
server.use(welcome);
server.use(logger("long"));

server.get("/", logger, (req, res) => {
  res.send(`<h2>iiiiiiiiiiiiii !</h2>`);
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something Went Wrong",
  });
});
 



module.exports = server;
