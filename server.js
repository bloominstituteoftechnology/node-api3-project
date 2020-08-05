const express = require("express");
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const validateUser = require("./middleware/validateUser");
const validateUserId = require("./middleware/validateUserId");

const server = express();
server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Requests to any users endpoint is handled by userRouter
server.use("/users", validateUser, userRouter);

// Requests to any posts endpoint is handled by postRouter
server.use("/posts", postRouter);

module.exports = server;
