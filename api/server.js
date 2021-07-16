const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { logger } = require("./middleware/middleware");
const usersRouter = require("./users/usersRoutes");
const server = express();

server.use(helmet());
server.use(morgan());
server.use(express.json());
server.use(logger);
server.use("/api/users", usersRouter);

// global middlewares and the user's router
server.get("/", (req, res) => {
  res.send("<h2> Lets write some middlware here </h2>");
});

server.use(function (req, res) {
  res.status(404).send("Aint nobody got time for that");
});

module.exports = server;
