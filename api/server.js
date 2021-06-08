const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const usersRouter = require("./users/users-router");
const { logger } = require("./middleware/middleware.js");

const server = express();

server.use(helmet());
server.use(morgan("dev"));

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use("/api/users", logger, usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
