const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const { logger } = require("./middleware/middleware");

const postsRoutes = require("./posts/postsRoutes");
const usersRoutes = require("./users/usersRoutes");

const server = express();
// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(logger);
server.use("/api/posts", postsRoutes);
server.use("/api/users", usersRoutes);
// global middlewares and the user's router need to be connected here

// server.use((err, req, res, next) => {
//   next();
//   const message = err?.errorMessage || "Something went wrong";
//   res.status(500).json({ message });
// });

server.use(function (req, res) {
  res.status(404).send("Aint nobody got time for that");
});

module.exports = server;
