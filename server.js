const express = require("express");
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");

const server = express();
const port = 5600;

server.use(logger());
server.use(express.json());
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use("/users", userRouter);

module.exports = { server, port };
