const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const postRoute = require("./posts/posts-router");
const userRoute = require("./users/users-router");
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));

// global middlewares and routes need to be connected here
server.use("/post", postRoute);
server.use("/api/users", userRoute);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
