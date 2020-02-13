const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());

server.use("/api/users", logger, userRouter);
server.use("/api/posts", logger, postRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl}`
  );
  next();
}

module.exports = server;
