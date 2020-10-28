const express = require("express");

const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use(postRouter);
server.use(userRouter);
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `Method: ${req.method}, URL: ${
      req.url
    }, timestamp: ${new Date().toISOString()}`
  );
}

module.exports = server;
