require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();
const port = process.env.PORT;

server.use(logger());
server.use(express.json());
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use("/users", userRouter);
server.use("/posts", postRouter);

module.exports = { server, port };
